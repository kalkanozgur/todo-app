import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { addTodo } from "./../context/todos/todosSlice";

function Form() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const handleSubmit = (e) => {
		if (!title) return;

		e.preventDefault();
		dispatch(addTodo({ title }));
	};
	return (
		<form onSubmit={handleSubmit}>
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
