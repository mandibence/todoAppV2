import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    isChecked: boolean;
    isEdited: boolean;
    todoName: string;
    newName: string;
}

interface UpdateNamePayload {
    id: string;
    newName: string;
}

const initialState: Todo[] = [];

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addNewTodo: (state, action: PayloadAction<Todo>) => {
            return [...state, action.payload];
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        changeIsEditedValue: (state, action: PayloadAction<string>) => {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item
                } else {
                    return {
                        ...item,
                        isEdited: !(item.isEdited)
                    }
                }
            })
        },
        changIsCheckedValue: (state, action: PayloadAction<string>) => {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item
                } else {
                    return {
                        ...item,
                        isChecked: !(item.isChecked)
                    }
                }
            })
        },
        changeNewNameValue: (state, action: PayloadAction<UpdateNamePayload>) => {
            return state.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                } else {
                    return {
                        ...item,
                        newName: action.payload.newName
                    }
                }
            })
        },
        changeTodoNameValue: (state, action: PayloadAction<string>) => {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item
                } else {
                    return {
                        ...item,
                        todoName: item.newName,
                        newName: "",
                    }
                }
            })
        }
    },
});

export const { addNewTodo, removeTodo, changeIsEditedValue, changIsCheckedValue, changeNewNameValue, changeTodoNameValue } = todoListSlice.actions;

export default todoListSlice.reducer;
