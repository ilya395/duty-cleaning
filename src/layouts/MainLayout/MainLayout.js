import React, { useState, useEffect } from 'react';

import './MainLayout.scss';
import { Layout, Menu } from 'antd';

import MyCalendar from '../../components/Calendar/Calendar';
import moment from 'moment';

import counterEvents from '../../services/index';
import ModalWindow from '../../components/Modal/Modal';

const { Header, Content, Footer } = Layout;

const data = [
  {title: 'архитекторы', id: 1},
  {title: 'it', id: 2},
  {title: 'бухгалтерия', id: 3},
  {title: 'аналитики', id: 4},
  {title: 'open space 1', id: 5},
  {title: 'open space 2', id: 6},
];

const MainLayout = () => {
    // текущая дата
    const [today, setToday] = useState(0);
    // текущий месяц
    const [thisMonth, setThisMonth] = useState(0);
    // количество дней в месяце
    const [numberOfDaysInThisMonth, setNumberOfDays] = useState(30);
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

    // текущая дата
    useEffect(() => {
      setToday(new Date());
    }, []);
    // текущий месяц
    useEffect(() => {
      setThisMonth(moment().format('M'));
    }, []);
    // количество дней в месяце
    useEffect(() => {
      setNumberOfDays(() => moment(new Date()).daysInMonth());
    }, []);
    // массив с данными для календаря 
    useEffect(() => {
      console.log('#### mutationData1: ', mutationData);
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

    }, [today, mutationData]);
    // модалка
    
    // console.log(thisMonth, numberOfDaysInThisMonth, dataForCalendar);

    const clickOnDay = (event) => {
      console.log(event);
      setModal(!modal);
      console.log(modal);
      setChangeDate(event.end);
      setChangeEventId(event.eventId);
      setChangeEventTitle(event.title);
    }

    const changeNewEventId = (newEventId, numberOfDay) => {
      const num = numberOfDay - 1;
      console.log(num, newEventId);
      setMutationData({[num]: newEventId});
      console.log(mutationData);
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
        />
      </>

    );
}

export default MainLayout;