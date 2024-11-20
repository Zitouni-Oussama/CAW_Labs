import React, { useState } from 'react';

function DisplayTab({ tab }) {
    return (
        <ul>
            {tab.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

function DisplayTabWithIndex({ tab }) {
    return (
        <ul>
            {tab.map((item, index) => (
                <li key={index}>Element {index + 1} is: {item}</li>
            ))}
        </ul>
    );
}

function DisplayTabWithClick({ tab }) {
    const [items, setItems] = useState(tab);

    const handleClick = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} onClick={() => handleClick(index)}>
                    Element {index + 1} is: {item}
                </li>
            ))}
        </ul>
    );
}

function DisplayTab1({ tab }) {
    return (
        <ul>
            {tab.map((item, index) => (
                <li key={index}>Element {index + 1} is: {item}</li>
            ))}
        </ul>
    );
}

export { DisplayTab, DisplayTabWithIndex, DisplayTabWithClick, DisplayTab1 };
