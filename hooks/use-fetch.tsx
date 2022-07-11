import { useEffect,useState } from 'react';
import { fetchWithCache } from '../utilities/fetch-with-cache';

function mockFetch(url:string , options: any): Promise<any> {
    const mockResp = JSON.stringify({url,options});

    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const response = {
                ok: false,
                url,
                status: 302,
                json: () => new Promise((resolve,reject)=>{
                    try {
                        const data = JSON.parse(mockResp);
                        resolve(data)
                    }
                    catch(e) {
                        reject(e)
                    }
                })
            }
            return resolve(response);
        }, 2000);
    });
}

export function useFetch(url: string, options?: any) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch(url,options)
        .then((response) => {
            if(!response.ok) {
                const message = getErrorMsg(response.status);
                console.error(message);
                setError(message);
                return;
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .finally(() => {
            setLoading(false);
        })
    },[url]);
    return [data,error,loading];
}

export function useFetchWithCache(url: string, options?: any, storageType = 'session') {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchWithCache(url,options,storageType)
        .then(({ok,data,source}) => {
            if(!ok) {
                return;
            }
            console.log(`source is ${source}: ${url}`);
            setData(data);
        })
        .catch((err)=> {
            const message = getErrorMsg(err);
            console.error(message);
            setError(message);
        })
        .finally(() => {
            setLoading(false);
        })
    },[url]);
    return [data,error,loading];
}

function getErrorMsg(status:number) {
    switch(status) {
        case 500:
            return  '500_INTERNAL_ERROR';
        case 404:
            return  '404_PAGE_NOT_FOUND';
        case 401:
            return  '401_AUTH_FAILED';
        default:
            return `${status}_UNKNOWN_ISSUE`;
    }
}

export default {
    useFetch,
    useFetchWithCache
}