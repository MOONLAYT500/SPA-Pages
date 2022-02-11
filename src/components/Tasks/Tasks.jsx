import s from './Tasks.module.css';
import Task from './Task/Task';

const Tasks = ({ filteredTodos, chekTodo, editTodo, deleteTodo }) => {
    return (
        <div className={s.tasks}>
            {filteredTodos.map((todo) => (
                <Task
                    key={todo.uuid}
                    todo={todo}
                    chekTodo={chekTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default Tasks;
