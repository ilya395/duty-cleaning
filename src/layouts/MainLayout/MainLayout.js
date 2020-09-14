import React, { useState, useEffect, useContext } from 'react';

import './MainLayout.scss';
import { Layout, Menu } from 'antd';

import MyCalendar from '../../components/Calendar/Calendar';
import moment from 'moment';

import LogoutButton from '../../components/LogoutButton/LogoutButton';

import counterEvents from '../../services/index';
import ModalWindow from '../../components/Modal/Modal';
import Firebase from '../../context/firebaseContext';

import Preloader from '../../components/Preloader/Preloader';

const { Header, Content, Footer } = Layout;

const dataDefault = [
  {title: 'Ожидание данных', id: 999},
  // {title: 'архитекторы', id: 1},
  // {title: 'it', id: 2},
  // {title: 'бухгалтерия', id: 3},
  // {title: 'аналитики', id: 4},
  // {title: 'open space 1', id: 5},
  // {title: 'open space 2', id: 6},
];

const MainLayout = (props) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => setLoading(false), []);

    // console.log(props);
    // коллекция объектов, которые нужно распределить по дням
    const [data, setData] = useState(dataDefault);
    // текущая дата
    const [today, setToday] = useState(0);
    // текущий месяц
    // const [thisMonth, setThisMonth] = useState(0);
    // количество дней в месяце
    // const [numberOfDaysInThisMonth, setNumberOfDays] = useState(30);
    // мутации календрных дней
    const [mutationData, setMutationData] = useState({});
    // массив с данными для календаря 
    const [dataForCalendar, setdataForCalendar] = useState([]);
    // модалка
    const [modal, setModal] = useState(false);
    // дата которую решили изменить
    const [changeDate, setChangeDate] = useState(0);
    // id и title дежурных на который поменяем событие
    const [changeEventId, setChangeEventId] = useState(0);
    const [changeEventTitle, setChangeEventTitle] = useState('');

    // коллекция объектов, которые нужно распределить по дням
    const { getDepartmentsRef, getMutationsRef, auth } = useContext(Firebase);
    useEffect(() => {
      // получение данных из базы
      getDepartmentsRef()
        .once('value')
        .then(res => {
            const array = res.val();
            let newArray = [];
            array.forEach(element => {
              newArray.push(element);
            });
            return newArray;
        })
        .then(res => {
          setData(res);
          console.log(`взяли data из базы`);
        })
        .catch(e => {
          console.log(e.message);
        });         
    }, [getDepartmentsRef]);
    // текущая дата
    useEffect(() => {
      setToday(new Date()); // '2020-10-12'
    }, []);
    // мутации календрных дней
    useEffect(() => {
      const muts = {};
      getMutationsRef({
        year: moment(today).format('YYYY'),
        month: moment(today).format('M'),
      })
        .once('value')
        .then(res => {
          // console.log(res.val());
          for ( let i in res.val() ) { // потомучто, если к нам приходят мутации из 1 элема с ключом 0, то приложение рассматривает это как массив, а не объект
            muts[i] = res.val()[i];
          }
          // console.log(muts, res.val())
        })
        .then(() => {
          setMutationData(muts);
        })
        .catch(error => console.log(error.message));      
    }, [today, getMutationsRef]);
    // текущий месяц
    // useEffect(() => {
    //   setThisMonth(moment().format('M'));
    // }, []);
    // количество дней в месяце
    // useEffect(() => {
    //   setNumberOfDays(() => moment(new Date()).daysInMonth());
    // }, []);
    // массив с данными для календаря 
    useEffect(() => {
      // console.log('#### mutationData1: ', mutationData);
      setdataForCalendar(() => counterEvents({
        data, 
        today, 
        // mutations: { // индекс дня: id очердности
        //   0: 3,
        //   6: 1,
        //   7: 1,
        //   8: 1
        // }
        mutations: mutationData
      }));

    }, [today, data, mutationData]);
    // модалка
    
    // console.log(thisMonth, numberOfDaysInThisMonth, dataForCalendar);

    const clickOnDay = (event) => {
      // console.log(event);
      setModal(!modal);
      // console.log(modal);
      setChangeDate(event.end);
      setChangeEventId(event.eventId);
      setChangeEventTitle(event.title);
    }

    const changeNewEventId = async (newEventId, date) => {
      const num = +moment(date).format('D') - 1;
      // console.log(num, newEventId);
      setMutationData( (prevState) => {
        return {...prevState, [num]: newEventId}
      } ); // индекс дня: id очердности
      // console.log(mutationData, moment(date).format('YYYY'), moment(date).format('M'));
      let mutsFromFirebase = {};
      await getMutationsRef({
        year: moment(date).format('YYYY'),
        month: moment(date).format('M')
      })
        .once('value')
        .then(res => {
          res.val().forEach((item, index) => {
            mutsFromFirebase[index] = item;
          })
          // console.log(mutsFromFirebase, res.val())
        })
        .then(() => {
          mutsFromFirebase[num] = newEventId;
          // console.log(num, newEventId, mutsFromFirebase)
          // return {...mutsFromFirebase, [num]: newEventId } // не расширяет
        })
        .catch(error => console.log(error.message));
      await getMutationsRef({
          year: moment(date).format('YYYY'),
          month: moment(date).format('M')
        })
        .set(mutsFromFirebase)
        .catch(error => console.log(error.message))
    }

    const logoutPlz = () => {
      console.log('ок, logout');

      auth.signOut();
      localStorage.removeItem('userId');

      const { history } = props;
      history.push('/auth');
    }

    if (loading) {
      return (
        <Preloader />
      );
    }
    
    // первый элемент
    return (
      <>
        <Layout className="layout main-layout main-layout_all-height">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            <LogoutButton
              logoutPlz={logoutPlz}
            />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content main-container">
              <MyCalendar events={dataForCalendar} clickOnDay={clickOnDay} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Duty Cleaing ©2020 Created by DVM Group</Footer>
        </Layout>
        <ModalWindow 
          date={changeDate} 
          data={data} 
          visible={modal} 
          changeVisible={setModal}
          eventId={changeEventId}
          eventName={changeEventTitle}
          changeNewEventId={changeNewEventId}
          today={today}
        />
      </>

    );
}

export default MainLayout;