import React from 'react';
import useToggle from '../hooks/use-toggle';

export default function UseToggleExample() {
    const [toggle, setToggleValue] = useToggle();
    return (
        <div>
            <h1>Use Toggle Hook Demo</h1>
            <b>{toggle.toString()}</b>
            <button onClick={()=>{
                setToggleValue();
            }}>Toggle</button>
            <button onClick={()=>setToggleValue(true)}>Make True</button>
            <button onClick={()=>setToggleValue(false)}>Make false</button>
        </div>
    )
}