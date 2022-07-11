import React, { useState } from 'react';
import usePrevious from './hook';

export default function UsePreviousExample() {
    const [number, setNumber] = useState(0);
    const previousNumber = usePrevious(number);
    return (
        <div>
            <h1>Use Previous Hook</h1>
            <p>before: {previousNumber}, now: {number}</p>
            <button onClick={()=>setNumber(number + 1)}>increment</button>
        </div>
    )
}