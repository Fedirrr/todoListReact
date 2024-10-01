import React, { Component } from 'react'
import './todo-list-item.css'


export default class TodoListItem extends Component {

    render() {
        const {label,onDeleted,onToggleImportant,onToggleDone, done,important} = this.props;

        let name = 'todo-list-item';

        if (done) {
            name += ' done';
        }
        if (important) {
            name += ' important';
        }
        return (
            <span className={name}>
                <span
                    className='todo-list-item-label'
                    onClick={onToggleDone}>
                    {label}
                </span>

            <span className='btns'>
                <button type='button' className='btn btn-outline-success btn-sm'
                onClick={onToggleImportant}>
                    <i className='fa fa-exclamation'></i>
                </button>

                <button type='button' className='btn btn-outline-danger btn-sm'
                onClick={onDeleted}>
                    <i className='fa fa-trash-o'></i>
                </button>
            </span>
        </span>
        )
    }
}



