import React, { useState } from 'react';

function Button1() {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <button onClick={() => setClicked(true)}>ClickMe</button>
            {clicked && <p>Clicked</p>}
        </div>
    );

}

function ToggleButton() {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <button onClick={() => setClicked(!clicked)}>ClickMe</button>
            <p>{clicked ? "Clicked" : "Not Clicked"}</p>
        </div>
    );
}

function AppWithButtons() {
    const [message, setMessage] = useState("");

    const handleClick = (buttonNumber) => {
        setMessage(`Button ${buttonNumber} was clicked`);
    };

    return (
        <div>
            <button onClick={() => handleClick(1)}>Button1</button>
            <button onClick={() => handleClick(2)}>Button2</button>
            <button onClick={() => handleClick(3)}>Button3</button>
            <p>{message}</p>
        </div>
    );
}

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Inc</button>
            <button onClick={() => setCount(0)}>0</button>
            <button onClick={() => setCount(count - 1)}>Dec</button>
        </div>
    );
}



export {Button1 ,ToggleButton, AppWithButtons, Counter};
