import { Input } from 'antd';
import React, { useState } from 'react';
import { EnterOutlined } from '@ant-design/icons/lib/icons';

const Creator = ({ createTodo }) => {
    const [input, setInput] = useState('');

    const handlerChange = (e) => setInput(e.target.value); // setting input to state

    const handlerSubmit = (e) => {
        createTodo(input); // setting text to new todo from
        setInput(''); // setting empty string afret setting
    };


    return (
        <Input
            style={{ marginBottom: 20, borderRadius: 10, border: 'none' }}
            suffix={<EnterOutlined style={{ color: '#1890ff' }} />}
            placeholder="I want to do..."
            value={input}
            onChange={handlerChange}
            onPressEnter={handlerSubmit}
        />
    );
};

export default Creator;
