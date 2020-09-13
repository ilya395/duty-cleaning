import React from 'react';

import { Button } from 'antd';

const LogoutButton = (props) => {

    return (
        <>
            <Button 
                type="primary" 
                danger
                onClick={props.logoutPlz}
            >
                Выкатиться
            </Button>
        </>
    );
}

export default LogoutButton;