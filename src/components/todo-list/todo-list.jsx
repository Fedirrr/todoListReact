import React from 'react';
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    return (
        <ul className="list-group todo-list">
            {todos.map((item) => {
                const { id, ...itemProps } = item;

                return (
                    <li key={id} className="list-group-item">
                        <TodoListItem
                            {...itemProps}
                            onDeleted={() => onDeleted(id)}
                            onToggleImportant={() => onToggleImportant(id)}
                            onToggleDone={() => onToggleDone(id)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default React.memo(TodoList);