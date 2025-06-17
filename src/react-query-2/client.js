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
    
    async function fetchQuery(key, fn) {
        if(cache.has(key)) {            
            return cache.get(key)
        }        

        cache.set(key, {status: 'loading', data: null})
        
        try {
            const response = await fn();
            const responseData = await response.json()            
            cache.set(key, {status: 'success', data: responseData});
            return {status: 'success', data: responseData}
        } catch (error) {
            cache.set(key, {status: 'error', data: null, error});
            return error
        }
    }

    return {
        fetchQuery
    }
}
