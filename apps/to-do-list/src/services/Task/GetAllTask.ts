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
    switch (response.status) {
        case 200:
            return response.json();
        default:
            return response.status;
    } 
    
}