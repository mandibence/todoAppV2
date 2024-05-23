import React, { ChangeEvent } from "react";
import "../css/Main.css";
import { useSelector, useDispatch } from 'react-redux';
import { addNewTodo, removeTodo, editTodoText, changeCheckBoxValue } from '../redux/todoListSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store';

interface Todo {
    id: string;
    isChecked: boolean;
    isEdited: boolean;
    todoName: string;
}

const Main: React.FC = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state: RootState) => state.todoList);

    const todoListToRender = todos.map((todo: Todo) => (
        <div className="todoElement" key={todo.id}>
            <input type="checkbox" checked={todo.isChecked} onClick={() => switchingCheckBoxValue(todo.id)} className="todoCheckbox" />
            <li className="todoName">
                {todo.todoName}
            </li>
            <button className="todoEditButton" onClick={() => editTodo(todo.id)}>Edit</button>
            <button className="todoDeleteButton" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    ));

    const [newTodo, setNewTodo] = React.useState<Todo>({
        id: "",
        isChecked: false,
        isEdited: false,
        todoName: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo({
            id: uuidv4(),
            isChecked: false,
            isEdited: false,
            todoName: event.target.value
        });
    }

    function handleClick() {
        dispatch(addNewTodo(newTodo));
        setNewTodo({
            id: "",
            isChecked: false,
            isEdited: false,
            todoName: "",
        });
    }

    function deleteTodo(id: string) {
        dispatch(removeTodo(id));
    }

    function editTodo(id: string) {
        dispatch(editTodoText(id))
    }

    function switchingCheckBoxValue(id: string) {
        dispatch(changeCheckBoxValue(id));
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