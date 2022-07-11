import React, { useEffect } from 'react';
import useUpdateEffect from './hook';

export default function UseUpdatedEffectExample() {
    console.log('rendered');
    const [input, setInput] = React.useState("");

    let previousInput = input;

    useEffect(()=>{
        console.log(`use effect with input (${input}) state change`)
        return () => {
            previousInput = input;
            console.log(`unmounted in dependency change (${input})`)
        }
    },[input])

    useUpdateEffect(()=>{
        console.log(`if input not change it won't call`)
        return () => {
            previousInput = input;
            console.log(`if input not change it won't call (${input})`)
        }
    },[input])

    return (
        <>
            <h1>LifeCycle With Hooks</h1>
            <input onChange={(e)=>{setInput(e.target.value)}} type="text" />
        </>
    )
}