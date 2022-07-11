const isEmptyValue = (value: any) => !value || Object.keys(value).length === 0;

export async function fetchWithCache(url: string, options?: any, storageType='session'): Promise<any> {
    let result = await getStorageAsync(url, storageType);
    if(!isEmptyValue(result)) {
        return new Promise((resolve)=> {
            resolve({
                ok: true,
                source: storageType,
                data: JSON.parse(result),
            });
        })        
    }
    return new Promise((resolve:any, reject: any)=> {
        fetch(url, options)
        .then(async response => {
            if(!response.ok) {
                return reject(response.status);
            }
            const data = await response.json();
            try {
                await setStorageAsync(url, data, storageType);
                return resolve({
                    ok: true,
                    source: 'url',
                    data,
                });
            } catch(e) {
                return reject(response.status);
            }
        })
    });
}

export function getStorageAsync(key: string, type='session'): Promise<any> {
    return new Promise((resolve:any)=> {
        const storage = type === 'session' ? sessionStorage : localStorage;
        let result = storage.getItem(key);
        resolve(result);
    });
}  

export function setStorageAsync(key: string, value: any, type='session'): Promise<any> {
    if(!isEmptyValue(value)) {
        const storage = type === 'session' ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
    }
    return new Promise((resolve: any) => {
        resolve(value);
    });
    
} 