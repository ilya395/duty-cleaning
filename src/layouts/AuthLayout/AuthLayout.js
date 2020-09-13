import React, { useContext, useEffect, useState } from 'react';

import './AuthLayout.scss';

import { Form, Input, Button } from 'antd';
import FirebaseContext from '../../context/firebaseContext';
import RoutesContext from '../../context/routesContext';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};

const AuthLayout = (props) => {

    console.log('#### props in Auth: ', props, props.history);

    const [history, setHistory] = useState({});
    useEffect(() => {
        const { history } = props;
        setHistory(history);
    }, [props]);

    const [authOk, setAuthOk] = useState(false);

    let localUserData = localStorage.getItem('userId');
    const [localData, setLocalData] = useState(localUserData);

    const { signWithEmail } = useContext(FirebaseContext);
    // const { history } = props; // useContext(RoutesContext);
    
    useEffect(() => {
        // const { history } = props;
        if ( authOk === true ) {
            // console.log(history);
            history.push('/main');  
        }
    }, [authOk, history]);

    const onFinish = values => {

    //   const { history } = props;

      
      const {email, password} = values;
      signWithEmail(email, password)
        .then(res => {
            console.log('Success:', values);
            console.log(res);
            localStorage.setItem('userId', res.user.uid);
            setAuthOk(true);
            console.log(localStorage.getItem('userId'));
            console.log(history);
            history.push('/main');
        })
        .catch(() => {
            console.log('кто ты тварь?');
            setAuthOk(false);
        });
    };
    
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return (
        <div className="form-wrap">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="form"
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Вкатиться
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AuthLayout;