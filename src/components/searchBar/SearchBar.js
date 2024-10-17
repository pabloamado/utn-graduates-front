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
                placeholder="Buscar por DNI o Nombre"
            />
        </div>
    );
}

export default SearchBar;