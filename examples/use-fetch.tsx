import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/use-debounce";
import {useFetch} from "../hooks/use-fetch";

export default function UseFetchExample() {
    const [resourceType, setResourceType] = useState("posts");
    const searchTerm = useDebounce(resourceType, 500);
    const [data, error, loading] = useFetch(`https://jsonplaceholder.typicode.com/${searchTerm}`);

    const renderBody = () => {
        if(loading) return <b>loading...</b>;
        if(error) return <b>please retry</b>;
        return (
            <div>
                <b>results:</b>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        )
    }
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
            {renderBody()}
        </div>
    )
}