import React, { useState } from 'react';
import './search-panel.css';

const SearchPanel = ({ onSearchChange }) => {
    const [term, setTerm] = useState('');

    const handleSearchChange = (e) => {
        const newTerm = e.target.value;
        setTerm(newTerm);
        onSearchChange(newTerm);
    };

    return (
        <input
            type='text'
            className='search-input'
            placeholder='search'
            value={term}
            onChange={handleSearchChange}
        />
    );
};

export default SearchPanel;