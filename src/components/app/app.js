import React, {Component} from 'react'
import AppHeader from "../app-header/app-header";
import SearchPanel from "../seacrh-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../items-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form";
import '../app/app.css'

export default class App extends Component {



    maxId = 4;

    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all',

    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData, filter}) => {

            const idx = todoData.findIndex((el) => el.id === id)
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newArray
            };
        })
    }
    addItem = (txt) => {
        const newItem = this.createTodoItem(txt);
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArray
            }
        })
    }

    onToggleDone = (id) => {

        this.setState(({todoData}) => {
            return {
                todoData: this.toggleproperty(todoData, id, 'done')
            }
        })

    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleproperty(todoData, id, 'important')
            }
        })
    }

    toggleproperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items
            case 'active':
                return items.filter((el) => !el.done)
            case 'done':
                return items.filter((el) => el.done)
            default:
                return items

        }
    }


    onSearchChange = (term) => {
        this.setState({term})
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }


    render() {

        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(
            this.search(todoData, term), filter
        );

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount
        return (
            <div className='container'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <SearchPanel
                    onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter filter={filter}
                                  onFilterChange={this.onFilterChange}/>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    }


}
