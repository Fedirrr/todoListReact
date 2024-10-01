import React, {useMemo, useState} from 'react';

import AppHeader from "../app-header/app-header.jsx";
import ItemAddForm from "../item-add-form/item-add-form.jsx";
import ItemStatusFilter from "../items-status-filter/item-status-filter.jsx";
import SearchPanel from "../seacrh-panel/search-panel.jsx";
import TodoList from "../todo-list/todo-list.jsx";

import {useTodoState} from "../utils/useTodoState";

import '../app/app.css';


const App = () => {
    const { todoData, addTodo, deleteTodo, toggleImportant, toggleDone } = useTodoState(['dsds','dsdsa']);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const search = (items, term) => {
        if (term.length === 0) return items;
        return items.filter((item) =>
            item.label.toLowerCase().includes(term.toLowerCase())
        );
    };

    const filterItems = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    };

    const visibleItems = useMemo(() => {
        return filterItems(search(todoData, term), filter);
    }, [todoData, term, filter]);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <div className='container'>
            <AppHeader toDo={todoCount} done={doneCount} />
            <SearchPanel onSearchChange={setTerm} />
            <ItemStatusFilter filter={filter} onFilterChange={setFilter} />
            <TodoList
                todos={visibleItems}
                onDeleted={deleteTodo}
                onToggleImportant={toggleImportant}
                onToggleDone={toggleDone}
            />
            <ItemAddForm onItemAdded={addTodo} />
        </div>
    );
};

export default App;
