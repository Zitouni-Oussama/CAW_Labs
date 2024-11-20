import React, { useState } from 'react';

function AddDivForm() {
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [color, setColor] = useState('');
    const [divs, setDivs] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure that height and width are numbers and append "px"
        if (height && width && color) {
            setDivs([...divs, { height: `${height}px`, width: `${width}px`, color }]);
            setHeight('');
            setWidth('');
            setColor('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Height (px)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Width (px)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button type="submit">Add Div</button>
            </form>

            {/* Render divs */}
            {divs.map((div, index) => (
                <div
                    key={index}
                    style={{
                        height: div.height,
                        width: div.width,
                        backgroundColor: div.color,
                        margin: '10px',
                    }}
                >
                    Custom Div
                </div>
            ))}
        </div>
    );
}

export default AddDivForm;
