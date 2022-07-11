import { useState } from 'react';

export default function useToggle 
    (initValue?:boolean): [boolean, (toggle?:boolean) => void] {
        const [toggle, setToggle] = useState(initValue || false);
        function setToggleValue(value?: boolean):void {
            setToggle(currentValue => typeof value === 'boolean' ? value : !currentValue)
        }
        return [toggle, setToggleValue];
    }