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

const AuthLayout = () => {

    const [authOk, setAuthOk] = useState(false);

    

    const { signWithEmail } = useContext(FirebaseContext);
    const { history } = useContext(RoutesContext);
    
    useEffect(() => {
        if ( authOk === true ) {
            // console.log(history);
            history.push('/');  
        }
    }, [authOk, history]);

    const onFinish = values => {

      console.log('Success:', values);
      const {email, password} = values;
      signWithEmail(email, password)
        .then(res => {
            console.log(res);
            localStorage.setItem('userId', res.user.uid);
            setAuthOk(true);
            console.log(localStorage.getItem('userId'));
            // const { history } = props;
            console.log(history);
            history.push('/');
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