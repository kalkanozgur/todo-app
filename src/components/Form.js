import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { addTodo } from "./../context/todos/todosSlice";

function Form() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addTodo({ id: nanoid(), title, completed: false }));
	};
	return (
		<form onSubmit={handleSubmit}>
			{title}
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				autoFocus
			/>
		</form>
	);
}

export default Form;
