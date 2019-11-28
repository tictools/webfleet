const API_URL = "https://www.googleapis.com/books/v1/volumes?q=javascript";

/**
 * Retrieves a student
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */

export default function(query){
    return(async () => {
        const headers = {'content-type' : 'application/json'}
        const response = await fetch(API_URL , {
            method : 'GET',
            headers: headers
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error (error)
        }else{
            return await response.json()
        }
    })()
}

 