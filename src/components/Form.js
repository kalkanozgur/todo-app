import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addTodoAsync } from "./../context/todos/todosSlice";
import Loading from "./Loading";

function Form() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
	const error = useSelector((state) => state.todos.addNewTodoError);
	const [title, setTitle] = useState("");
	const handleSubmit = async (e) => {
		if (!title) return;
		e.preventDefault();

		await dispatch(addTodoAsync({ title }));

		setTitle("");
	};
	if (error) {
		alert(error);
		return;
	}
	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<input
				disabled={isLoading}
				className="new-todo"
				placeholder="What needs to be done?"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				autoFocus
			/>
			{isLoading && <Loading />}
		</form>
	);
}

export default Form;
