import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
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
    },
});

export const { addNewTodo, removeTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
