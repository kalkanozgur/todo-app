import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const uri = process.env.REACT_APP_API_BASE_ENDPOINT;

export const getTodosAsync = createAsyncThunk(
	"todos/getTodosAsync/",
	async () => {
		const res = await axios(`${uri}/todos`);
		return await res.data;
	}
);
export const addTodoAsync = createAsyncThunk(
	"todos/addTodoAsync/",
	async (data) => {
		const res = await axios.post(`${uri}/todos`, data);
		return await res.data;
	}
);

export const todosSlice = createSlice({
	name: "todos",
	initialState: {
		items: [
			// {
			// 	id: "1",
			// 	title: "Learn React",
			// 	completed: true,
			// },
			// {
			// 	id: "2",
			// 	title: "Read a Book",
			// 	completed: false,
			// },
		],
		isLoading: false,
		error: null,
		addNewTodoIsLoading: false,
		addNewTodoError: null,
		activeFilter: "all",
	},
	reducers: {
		toggle: (state, action) => {
			const { id } = action.payload;
			const item = state.items.find((item) => item.id === id);

			item.completed = !item.completed;
		},
		destroy: (state, action) => {
			const id = action.payload;
			const filtered = state.items.filter((item) => item.id !== id);
			state.items = filtered;
		},
		changeActiveFilter: (state, action) => {
			state.activeFilter = action.payload;
		},
		clearCompleted: (state) => {
			const filtered = state.items.filter((item) => item.completed === false);
			state.items = filtered;
		},
	},
	extraReducers: {
		//get todo
		[getTodosAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getTodosAsync.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.isLoading = false;
		},
		[getTodosAsync.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
		//add todo
		[addTodoAsync.pending]: (state, action) => {
			state.addNewTodoIsLoading = true;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.items.push(action.payload);
			state.addNewTodoIsLoading = false;
		},
		[addTodoAsync.rejected]: (state, action) => {
			state.addNewTodoIsLoading = false;
			state.addNewTodoError = action.error.message;
		},
	},
});

export const selectTodos = (state) => state.todos.items;

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const selectFilteredTodos = (state) => {
	if (state.todos.activeFilter === "all") {
		return state.todos.items;
	}
	return state.todos.items.filter((todo) =>
		state.todos.activeFilter === "active"
			? todo.completed === false
			: todo.completed === true
	);
};

export const { toggle, destroy, changeActiveFilter, clearCompleted } =
	todosSlice.actions;

export default todosSlice.reducer;
