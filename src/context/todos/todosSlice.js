import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
	name: "todos",
	initialState: {
		items: [
			{
				id: nanoid(),
				title: "Learn React",
				completed: true,
			},
			{
				id: nanoid(),
				title: "Read a Book",
				completed: false,
			},
		],
	},
	reducers: {
		addTodo: (state, action) => {
			state.items.push(action.payload);
		},
		toggle: (state, action) => {
			const { id } = action.payload;
			const item = state.items.find((item) => item.id === id);

			item.completed = !item.completed;
		},
	},
});

export const { addTodo, toggle } = todosSlice.actions;

export default todosSlice.reducer;
