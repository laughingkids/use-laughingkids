import React, { useState, useEffect, useMemo, useRef } from "react";
import useDebounce from "./hook";

export default function UseDebounceExample() {
    const [resourceType, setResourceType] = useState("posts");
    const [results, setResults] = useState<any[]>([]);
    const searchTerm = useDebounce(resourceType, 500);
    const url = `https://jsonplaceholder.typicode.com/${resourceType}`;

    
    useEffect(() => {
      if(searchTerm) {
        fetch(url)
        .then(resp => resp.json())
        .then((data)=>{
            setResults(data);
        })
      } else {
        setResults([]);
      }
    }, [searchTerm]);
    
    return(
        <div>
             <select onChange={(e)=>setResourceType(e.target.value)}>
                <option value={'posts'}>Posts</option>
                <option value={'users'}>Users</option>
                <option value={'comments'}>Comments</option>
            </select>
            <p>
                <b>searching:{searchTerm}</b>
            </p>
            <div>
                <b>results:</b>
                <pre>{JSON.stringify(results)}</pre>
            </div>
        </div>
    )
}