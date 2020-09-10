import React from 'react';

import './Calendar.scss';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

// moment.locale("ru-RU");

moment.locale('ru', {
    weekdays : [
        "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"
    ],
    week: {
        dow: 1,
        doy: 1,
    },
});
console.log(moment);
console.log(moment.locale());
const localizer = momentLocalizer(moment);

const myEventsList = [{
    title: 'Архитекторы',
    start: moment([2020, 8, 9]),
    end: moment([2020, 8, 9]),
    allDay: true, 
}];

// const [queue, setQueue] = useState([]);

const MyCalendar = (props) => {

  console.log('#### Props in Calendar', props.events)

    const move = (event) => {
        props.clickOnDay(event);
    }

    return (
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={props.events || myEventsList}
          startAccessor="start"
          endAccessor="end"
          views={{
            month: true,
          }}
          onSelectEvent={event => move(event)}
        />
      </div>
    );
}   

export default MyCalendar;