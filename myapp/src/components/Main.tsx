import React, { ChangeEvent } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addNewTodo, removeTodo, changeIsEditedValue, changIsCheckedValue, changeNewNameValue, changeTodoNameValue } from '../redux/todoListSlice'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../redux/store'
import "../css/Main.css"

interface Todo {
    id: string
    isChecked: boolean
    isEdited: boolean
    todoName: string
    newName: string
}

const Main: React.FC = () => {

    const dispatch = useDispatch()

    const todos = useSelector((state: RootState) => state.todoList)

    const [newTodo, setNewTodo] = React.useState<Todo>({
        id: "",
        isChecked: false,
        isEdited: false,
        todoName: "",
        newName: "",
    })
    
    const todoListToRender = todos.map((todo: Todo) => {

        if (!(todo.isEdited)) {
            return (
                < div className = "todoElement" key = { todo.id } >
                    <input className="todoCheckbox" type="checkbox" checked={todo.isChecked} onClick={() => handleCheckBoxClick(todo.id)}/>
                    <li className="todoName">
                        {todo.todoName}
                    </li>
                    <button className="todoEditButton" onClick={() => handleEditTodoClick(todo.id)}>Edit</button>
                    <button className="todoDeleteButton" onClick={() => handleDeleteTodoClick(todo.id)}>Delete</button>
                </div >
            )
        } else {
            return (
                <div className="todoElementEditing">
                    <input
                        className="todoEditInput"
                        onChange={(event) => handleEditTodoInPutChange(todo.id, event)}
                        value={todo.newName}
                    />
                    <button
                        className="todoEditDoneButton"
                        onClick={() => handleEditDoneClick(todo.id)}
                    >
                        Done
                    </button>
                </div>
            )          
        }
    })

    function handleNewTodoInPutChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTodo({
            id: uuidv4(),
            isChecked: false,
            isEdited: false,
            todoName: event.target.value,
            newName: event.target.value,
        })
    }

    function handleCreateNewTodoClick() {
        dispatch(addNewTodo(newTodo))
        setNewTodo({
            id: "",
            isChecked: false,
            isEdited: false,
            todoName: "",
            newName: "",
        })
    }

    function handleDeleteTodoClick(id: string) {
        dispatch(removeTodo(id))
    }

    function handleEditTodoClick(id: string) {
        dispatch(changeIsEditedValue(id))
    }

    function handleCheckBoxClick(id: string) {
        dispatch(changIsCheckedValue(id))
    }

    function handleEditTodoInPutChange(id: string, event: ChangeEvent<HTMLInputElement>) {
        const currentPayload = {
            id: id,
            newName: event.target.value
        }
        dispatch(changeNewNameValue(currentPayload))
    }

    function handleEditDoneClick(id: string) {
        dispatch(changeTodoNameValue(id))
        handleEditTodoClick(id)       
    }
 
    return (
        <div>
            <div className="newTodoContainer">
                <input
                    className="newTodoInput"
                    value={newTodo.todoName}
                    placeholder="type new todo here..."
                    onChange={handleNewTodoInPutChange}
                    maxLength={24}
                />
                <button
                    className="newTodoButton"
                    onClick={handleCreateNewTodoClick}
                    id="createButton"
                >
                    Create
                </button>
            </div>
            <div>
                <ul className="todoList">
                    {todoListToRender}
                </ul>
            </div>
        </div>
    )
}

export default Main