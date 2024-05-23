import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    isChecked: boolean;
    isEdited: boolean;
    todoName: string;
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
        editTodoText: (state, action: PayloadAction<string>) => {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item
                } else {
                    return {
                        ...item,
                        isEdited: true
                    }
                }
            })
        },
        changeCheckBoxValue: (state, action: PayloadAction<string>) => {
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
        }

    },
});

export const { addNewTodo, removeTodo, editTodoText, changeCheckBoxValue } = todoListSlice.actions;

export default todoListSlice.reducer;
