import moment from 'moment';

const counterEvents = (object) => {
    const { data: queueСollection, today, mutations } = object;
    // console.log('#### counterEvents: ', mutations);

    const numberOfDays = moment(today).daysInMonth(); // количество дней в месяце
    const thisYear = moment(today).format('YYYY'); // текущий год
    const thisMonth = moment(today).format('M') - 1;  // текущий месяц

    let array = [];
    // let countOfCut = 0;
    let countOfDaysNumber = 0;

    // const iter = Math.floor(numberOfDays/queueСollection.length); // отношение: сколько целых раз малая коллекция может поместиться в большой (отсечка)
    // отсечка равна queueСollection.length
    // const surplus = numberOfDays%queueСollection.length; // отстаток

    for ( let i = 0; i < numberOfDays; i++) { // день = i + 1

        const obj = {
            title: '',
            start: moment([thisYear, thisMonth, i + 1]),
            end: moment([thisYear, thisMonth, i + 1]),
            allDay: true,
        }

        if (
            moment([thisYear, thisMonth, i + 1]).isoWeekday() !== 6 &&
            moment([thisYear, thisMonth, i + 1]).isoWeekday() !== 7 &&
            moment([thisYear, thisMonth, i + 1]).isoWeekday() !== 0
        ) {

            // счетчики
            countOfDaysNumber++; // отсчитываем дни в отрезке
            if ( mutations[i] ) {
                const indexInQueueСollection = queueСollection.findIndex(item => item.id === mutations[i]);
                countOfDaysNumber = indexInQueueСollection + 1;
            }
            if ( countOfDaysNumber > queueСollection.length ) {
                // countOfCut++; // отрезки
                countOfDaysNumber = 1;
            }
            //

            let whosOnDuty = {};

            if ( mutations[i] ) {
                whosOnDuty = queueСollection.find( item => item.id === mutations[i] );
            } else {
                whosOnDuty = queueСollection[ countOfDaysNumber - 1 ];
            }

            obj.title = whosOnDuty.title;
            obj.eventId = whosOnDuty.id
        } else {
            obj.title = 'Выходной';
            obj.eventId = 99;
        }

        array.push(obj);
        
    }
    return array;
}

export default counterEvents;