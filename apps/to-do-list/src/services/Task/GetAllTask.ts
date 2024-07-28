import { base_url } from "../../config/urls";


export const GetAllTask = async () => {
    const userToken  = sessionStorage.getItem('userToken') 
    
    const response = await fetch(`${base_url}/task`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${userToken}`  
        },
    });    
    if (response.ok) {
        const data = await response.json();
        return data;
    }   
    
}