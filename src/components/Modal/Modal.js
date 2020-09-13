import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Modal.scss';

import { Modal, Select } from 'antd';

const { Option } = Select;

const ModalWindow = (props) => {
    console.log('#### Modal props: ', props);

    const [disabledSelect, setDisabledSelect] = useState(false);

    useEffect(() => {
        props.eventName === 'Выходной' ? setDisabledSelect(true) : setDisabledSelect(false);
        const today = +moment(props.today).format('D');
        const thisDay = +moment(props.date).format('D');
        thisDay < today ? setDisabledSelect(true) : setDisabledSelect(false);
    }, [props.eventName, props.today, props.date]);

    const handleCancel = () => {
        props.changeVisible(!props.visible);
    }

    function onChange(value) {
        console.log(`selected ${value}`, moment(props.date).format('D'));
        props.changeNewEventId(+value, moment(props.date));
    }
    
    function onBlur() {
        console.log('blur');
    }
    
    function onFocus() {
        console.log('focus');
    }
    
    function onSearch(val) {
        console.log('search:', val);
    }

    return (
      <Modal
        title="Хочешь сказать, что кто-то вовремя не убрался?"
        visible={props.visible}
        // visible={this.state.visible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <p>
            Дата: {moment(props.date).format('DD MM YYYY')}
        </p>
        <p>
            Дежурный отдел: {props.eventName === 'Выходной' ? 'Нет' : props.eventName} 
        </p>
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Выбрать дежурного"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={disabledSelect}
            >
                {
                    props.data.map(item => (
                    <Option key={item.id} value={item.id}>{item.title}</Option>
                    ))
                }
            </Select>
        </div>
      </Modal>
    );
}

export default ModalWindow;