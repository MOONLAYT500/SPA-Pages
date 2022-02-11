import { Pagination } from 'antd';
import React from 'react';
import Creator from '../Creator/Creator';
import Sorter from '../Sorter/Sorter';
import Tasks from '../Tasks/Tasks';

const Main = ({
    createTodo,
    statusFilter,
    createdAtFilter,
    editTodo,
    deleteTodo,
    filteredTodos,
    todosCount,
    currentPage,
    postsPerPage,
    paginate,
}) => {
    return (
        <div>
            <Creator createTodo={createTodo} />
            <Sorter
                statusFilter={statusFilter}
                createdAtFilter={createdAtFilter}
            />
            {todosCount === 0 ? (
                <div>No Tasks</div> // if filtered tasks is empty
            ) : (
                <Tasks
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    filteredTodos={filteredTodos}
                />
            )}
            <Pagination
                style={{ marginTop: 'auto' }}
                current={currentPage}
                pageSize={postsPerPage}
                onChange={paginate}
                total={todosCount}
                hideOnSinglePage={true} // hide pagination on single page
            />
        </div>
    );
};

export default Main;
