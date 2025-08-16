// export class QueryClient {
//   constructor() {
//     this.map = new Map();
//   }

//   async fetchQuery(key, fn) {
//     if (this.map.has(key)) {
//       return this.map.get(key).data;
//     }
//     this.map.set(key, { data: null, status: "loading" });

//     try {
//       const response = await fn();
//       this.map.set(key, { data: response, status: "success" });
//       return response;
//     } catch (err) {
//       this.map.set(key, { data: null, status: "error" });
//     }
//   }
// }

export function createQueryClient() {
    const cache = new Map();
    
    async function fetchQuery(key, fn, retry = 0) {
        if(cache.has(key) && cache.get(key).status !== 'error') {           
            return cache.get(key)
        }        

        cache.set(key, {status: 'loading', data: null})
        
        try {
            // throw new Error("new error")
            const response = await fn();
            const responseData = await response.json()            
            cache.set(key, {status: 'success', data: responseData});
            setTimeout(() => {
                cache.delete(key)
            }, 5000)
            return {status: 'success', data: responseData}
        } catch (error) {            
            cache.set(key, {status: 'error', data: null, error});
            if(retry <= 3) {                
                fetchQuery(key, fn, retry+1)
            }
            return {status: 'error', data: null, error}
        }
    }

    return {
        fetchQuery
    }
}
