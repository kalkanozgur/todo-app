import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy } from "./../context/todos/todosSlice";

function TodoList() {
	const items = useSelector((state) => state.todos.items);
	const dispatch = useDispatch();

	const activeFilter = useSelector((state) => state.todos.activeFilter);
	let filtered = items;
	if (activeFilter !== "all") {
		filtered = items.filter((todo) =>
			activeFilter === "active"
				? todo.completed === false
				: todo.completed === true
		);
	}
	// else filtered = items;
	const handleDestroy = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(destroy(id));
		}
	};

	return (
		<>
			<ul className="todo-list">
				{filtered.map((item) => (
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
