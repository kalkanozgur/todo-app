import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
	toggle,
	destroy,
	selectFilteredTodos,
	getTodosAsync,
} from "./../context/todos/todosSlice";
import Error from "./Error";
import Loading from "./Loading";

function TodoList() {
	const filteredTodos = useSelector(selectFilteredTodos);
	// console.log(filteredTodos);
	const isLoading = useSelector((state) => state.todos.isLoading);
	const error = useSelector((state) => state.todos.error);
	const dispatch = useDispatch();

	const handleDestroy = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(destroy(id));
		}
	};
	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	if (isLoading) {
		return <Loading />;
	}
	if (error) {
		return <Error message={error} />;
	}

	return (
		<>
			<ul className="todo-list">
				{filteredTodos.map((item) => (
					<li key={item.id} className={item.completed ? "completed" : ""}>
						<div className="view">
							<input
								className="toggle"
								type="checkbox"
								onChange={() => {
									dispatch(toggle({ id: item.id }));
								}}
								checked={item.completed}
							/>
							<label>{item.title}</label>
							<button
								className="destroy"
								onClick={() => handleDestroy(item.id)}
							></button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default TodoList;
