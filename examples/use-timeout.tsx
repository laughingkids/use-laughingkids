import React, {useState}  from 'react';
import useTimeout from './hook';

export default function UseTimeoutExample() {
    const [count, setCount] = useState(10);
    const {clear, reset} = useTimeout(()=>setCount(0),1000);

    return(
        <div>
            <h1>Use Timeout Hook Demo</h1>
            <p><b>{count}</b></p>
            <button onClick={()=> setCount(count => count + 1)}>Increment</button>
            <button onClick={()=> setCount(count => count - 1)}>Decrement</button>
            <button onClick={clear}>Clear Timeout</button>
            <button onClick={reset}>Reset Timeout</button>
        </div>
    )
}