import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addNewTodo, removeTodo, changeIsEditedValue, changIsCheckedValue, changeNewNameValue, changeTodoNameValue } from '../redux/todoListSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store';
import "../css/Main.css";

interface Todo {
    id: string;
    isChecked: boolean;
    isEdited: boolean;
    todoName: string;
    newName: string;
}

const Main: React.FC = () => {

    const dispatch = useDispatch();

    const todos = useSelector((state: RootState) => state.todoList);

    const [newTodo, setNewTodo] = React.useState<Todo>({
        id: "",
        isChecked: false,
        isEdited: false,
        todoName: "",
        newName: "",
    });
    
    const todoListToRender = todos.map((todo: Todo) => {
        if (!(todo.isEdited)) {
            return (
                < div className = "todoElement" key = { todo.id } >
                <input type="checkbox" checked={todo.isChecked} onClick={() => switchingCheckBoxValue(todo.id)} className="todoCheckbox" />
                <li className="todoName">
                    {todo.todoName}
                </li>
                <button className="todoEditButton" onClick={() => editTodo(todo.id)}>Edit</button>
                <button className="todoDeleteButton" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div >
            )
        } else {
            return (
                <div className="todoElementEditing">
                    <input
                        className="todoEditInput"
                        onChange={(event) => changeTodoText(todo.id, event)}
                    />
                    <button
                        className="todoEditDoneButton"
                        onClick={() => editDoneClicked(todo.id)}
                    >
                        Done
                    </button>
                </div>
            )          
        }
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo({
            id: uuidv4(),
            isChecked: false,
            isEdited: false,
            todoName: event.target.value,
            newName: "",
        });
    }

    function handleClick() {
        dispatch(addNewTodo(newTodo));
        setNewTodo({
            id: "",
            isChecked: false,
            isEdited: false,
            todoName: "",
            newName: "",
        });
    }

    function deleteTodo(id: string) {
        dispatch(removeTodo(id));
    }

    function editTodo(id: string) {
        dispatch(changeIsEditedValue(id))
    }

    function switchingCheckBoxValue(id: string) {
        dispatch(changIsCheckedValue(id));
    }

    function changeTodoText(id: string, event: ChangeEvent<HTMLInputElement>) {
        const currentPayload = {
            id: id,
            newName: event.target.value
        }
        dispatch(changeNewNameValue(currentPayload))
    }

    function editDoneClicked(id: string) {
        dispatch(changeTodoNameValue(id))
        editTodo(id)       
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