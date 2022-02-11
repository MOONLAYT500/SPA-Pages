import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import s from './Login.module.css';

const Login = ({ register, login, getUserName }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState();
    const enterNickname = (e) => setNickname(e.target.value);
    const enterPassword = (e) => setPassword(e.target.value);

    const signUp = async () => {
        try {
            if (!(nickname || password) || /^\s*$/.test(nickname || password)) {
                // empty string filter
                message.error('Empty string not allowed'); // message to client
                return;
            }
            await register(nickname, password);
            getUserName(nickname);
        } catch (error) {}
    };

    const logIn = async () => {
        try {
            if (!(nickname || password) || /^\s*$/.test(nickname || password)) {
                // empty string filter
                message.error('Empty string not allowed'); // message to client
                return;
            }
            await login(nickname, password);
            getUserName(nickname);
        } catch (error) {}
    };

    return (
        <div className={s.login}>
            <Text className={s.text}> NICKNAME</Text>
            <Input
                className={s.input}
                value={nickname}
                onChange={enterNickname}
                placeholder="Enter your Login..."
            />
            <Text> PASSWORD</Text>
            <Input.Password
                className={s.input}
                value={password}
                onChange={enterPassword}
                placeholder="Enter your Password..."
            />
            <div className={s.buttons}>
                <Button className={s.button} onClick={signUp}>
                    Sign Up
                </Button>
                <Button className={s.button} onClick={logIn}>
                    Log In
                </Button>
            </div>
        </div>
    );
};

export default Login;
