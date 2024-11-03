import React, { useState } from 'react';
import './ListContainer.css';

function ListContainer({ items, onDelete }) {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div className="list-container">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="list-item"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    {item}
                    {hoveredItem === item && (
                        <button className="delete-button" onClick={() => onDelete(item)}>
                            ✕
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ListContainer;