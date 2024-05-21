import React, { ChangeEvent } from "react";
import "../css/Main.css";
import { useSelector, useDispatch } from 'react-redux';
import { addNewTodo, removeTodo } from '../redux/todoListSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store'; // Assuming you have a RootState type defined for your Redux store

interface Todo {
    id: string;
    todoName: string;
}

const Main: React.FC = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state: RootState) => state.todoList);

    const todoListToRender = todos.map((todo: Todo) => (
        <div className="todoElement" key={todo.id}>
            <input type="checkbox" className="todoCheckbox" />
            <li className="todoName">
                {todo.todoName}
            </li>
            <button className="todoDeleteButton" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    ));

    const [newTodo, setNewTodo] = React.useState<Todo>({
        id: "",
        todoName: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo({
            id: uuidv4(),
            todoName: event.target.value
        });
    }

    function handleClick() {
        dispatch(addNewTodo(newTodo));
        setNewTodo({
            id: "",
            todoName: "",
        });
    }

    function deleteTodo(id: string) {
        dispatch(removeTodo(id));
    }

    return (
        <div>
            <div className="newTodoContainer">
                <input
                    className="newTodoInput"
                    value={newTodo.todoName}
                    placeholder="type new todo here..."
                    onChange={handleChange}
                />
                <button
                    className="newTodoButton"
                    onClick={handleClick}
                    id="createButton"
                >
                    Create
                </button>
            </div>
            <div className="todoListContainer">
                <ul>
                    {todoListToRender}
                </ul>
            </div>
        </div>
    );
}

export default Main;