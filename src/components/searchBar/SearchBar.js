import React from 'react';
import './SearchBar.css'

function SearchBar({ param, onInputChange, onSearchClick }) {
    return (
        <div className="search-bar">
            <label htmlFor="searchInput">Buscador: </label>
            <input
                id="searchInput"
                type="text"
                value={param}
                onChange={onInputChange}
                placeholder="DNI, Nombre, mail o telefono"
            />
        </div>
    );
}

export default SearchBar;