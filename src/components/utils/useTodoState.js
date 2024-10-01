import {useState, useEffect} from 'react';


const createTodoItem = (label) => ({
    label,
    important: false,
    done: false,
    id: Date.now(),
});

const saveToLocalStorage = (data) => {
    localStorage.setItem('todos', JSON.stringify(data));
};

const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
        createTodoItem('Drink coffee'),
        createTodoItem('Make Awesome App'),
        createTodoItem('Have a lunch'),
    ];
};

export const useTodoState = (initialTodos) => {
    const [todoData, setTodoData] = useState(() => loadFromLocalStorage() || initialTodos);

    const addTodo = (label) => {
        const newItem = createTodoItem(label);
        setTodoData((prev) => [...prev, newItem]);
    };

    const deleteTodo = (id) => {
        setTodoData((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleTodoProperty = (id, propName) => {
        setTodoData((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, [propName]: !item[propName]} : item
            )
        );
    };

    const toggleImportant = (id) => toggleTodoProperty(id, 'important');
    const toggleDone = (id) => toggleTodoProperty(id, 'done');

    useEffect(() => {
        saveToLocalStorage(todoData);
    }, [todoData]);

    return {
        todoData,
        addTodo,
        deleteTodo,
        toggleImportant,
        toggleDone,
    };
};