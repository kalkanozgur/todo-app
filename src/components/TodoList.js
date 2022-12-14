import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
	toggle,
	destroy,
	selectFilteredTodos,
} from "./../context/todos/todosSlice";

function TodoList() {
	const filteredTodos = useSelector(selectFilteredTodos);
	// console.log(filteredTodos);
	const dispatch = useDispatch();

	const handleDestroy = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(destroy(id));
		}
	};

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
