import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { message, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons/lib/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

function App() {
    const navigate = useNavigate();
    const [filteredTodos, setFilteredTodos] = useState([]); //all tasks
    const [currentPage, setCurrentPage] = useState(1); //current page from pagination
    const [todosStatus, setTodosStatus] = useState('all'); // filter by done from sorter
    const [createdAt, setCreatedAt] = useState('desc'); // filter vu date from sorter
    const [todosCount, setTodosCount] = useState(0); //todos count from server
    const [postsPerPage] = useState(5); // post per page 1

    const api = axios.create({
        baseURL: 'https://todo-api500.herokuapp.com/api/', // creating baseURL
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            localStorage.removeItem('userName');
            navigate(`../SPA-ToDo`);
            return;
        }
        getTodos(); // recieving todos from api and rendering page
    }, [todosStatus, createdAt, currentPage]); // triggers to render

    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'token'
        )}`;
        return config;
    });

    api.interceptors.response.use(
        // error handle
        (response) => response,
        (error) => {
            let errorMessage;
            const res = error.request.response;
            if (!res) {
                errorMessage = 'No responce';
            }
            if (res === undefined) {
                errorMessage = 'Client side trouble';
            }
            if (error.response) {
                errorMessage = `${error.response.status}: ${error.response.data.message}`;
            }
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                navigate(`../SPA-ToDo`);
            }
            message.error(errorMessage);
        }
    );

    const getUserName = (nickname) =>
        localStorage.setItem('userName', nickname);

    const userName = localStorage.getItem('userName');

    const register = async (nickname, password) => {
        try {
            const res = await api.post(`register`, { nickname, password });
            const token = res.data.token;

            localStorage.setItem('token', token);
            getTodos();
            navigate(`../SPA-ToDo/todos`);
        } catch (error) {
            message.error('Registration error');
        }
    };

    const login = async (nickname, password) => {
        try {
            const res = await api.post(`login`, { nickname, password });
            const token = res.data.token;
            localStorage.setItem('token', token);
            getTodos();
            navigate(`../SPA-ToDo/todos`);
        } catch (error) {
            message.error('Log-in error');
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate(`../SPA-ToDo`);
    };

    async function getTodos() {
        try {
            // getting todos from server
            const res = await api.get(`todos`, {
                //sending request
                params: {
                    // form new request
                    filterBy: todosStatus === 'all' ? '' : todosStatus, // done status
                    order: createdAt, // time status
                    pp: postsPerPage, // todos on page count
                    page: currentPage, // current page to return
                },
            });
            if (res.data.todos.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
            setTodosCount(res.data.todos.count); //seting total todos count
            setFilteredTodos(res.data.todos.rows); // sitting final todos to render
        } catch (error) {}
    }

    const createTodo = async (input) => {
        try {
            // create and post new todo to server
            const todo = {
                //new todo
                name: input, // todo text
                done: false, // done status
            };
            if (!todo.name || /^\s*$/.test(todo.name)) {
                // empty string filter
                message.error('Empty string not allowed'); // message to client
                return;
            }
            await api.post(`todo`, todo); // posting new todo to api
            await getTodos(); // getting all todos to render
        } catch (error) {
            message.error('Empty string not allowed');
        }
    };

    const editTodo = async (todo, id) => {
        try {
            let res = await api.patch(`todo/${id}`, todo); // sending edited todo to api
            await getTodos(); //rendering edited
            console.log(res);
            return res;
        } catch (error) {
            message.error('edit error');
        }
    };

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todo/${id}`); // deleting todo by id
            await getTodos(); // rendering todos after deleting
        } catch (error) {
            message.error('delete error');
        }
    };

    const createdAtFilter = (key) => setCreatedAt(key); // setting time sattus to filter

    const statusFilter = (key) => setTodosStatus(key); // setting done status to filter

    const paginate = (pageNumber) => {
        getTodos(); // recieving todos
        setCurrentPage(pageNumber); //setting page to render
    };

    console.log(todosCount);
    return (
        <div className="body">
            {!userName ? (
                <div></div>
            ) : (
                <div className="logout">
                    <span>{userName}</span>
                    <Button
                        className="logout-button"
                        onClick={logOut}
                        icon={<LogoutOutlined />}
                        type="ghost"
                    />
                </div>
            )}
            <h1 className="header">To-Do List</h1>
            <div className="container">
                <Routes>
                    <Route
                        index
                        path="SPA-ToDo"
                        element={
                            <Login
                                register={register}
                                login={login}
                                getUserName={getUserName}
                            />
                        }
                    />
                    <Route
                        path="SPA-ToDo/todos"
                        element={
                            <Main
                                createTodo={createTodo}
                                statusFilter={statusFilter}
                                createdAtFilter={createdAtFilter}
                                editTodo={editTodo}
                                deleteTodo={deleteTodo}
                                filteredTodos={filteredTodos}
                                todosCount={todosCount}
                                currentPage={currentPage}
                                postsPerPage={postsPerPage}
                                paginate={paginate}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
