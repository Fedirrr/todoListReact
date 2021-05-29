import React from 'react'
import './item-status-filter.css'

export default class ItemStatusFilter extends React.Component {

    buttons = [
        {name:'all', label:'All'},
        {name:'active', label:'Active'},
        {name:'done', label:'Done'}
    ]

    render() {
        const {filter, onFilterChange} = this.props
        const buttons = this.buttons.map( ({name,label})=> {
            const isActve = filter === name
            const calzz = isActve ? 'btn-info': 'btn-outline-secondary'
            return (
                <button type='button'
                        className={`btn ${calzz}`}
                        key={name}
                        onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            )
        })
        return (
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }
}

// btn-outline-secondary

