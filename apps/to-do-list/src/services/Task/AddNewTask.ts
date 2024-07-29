import { base_url } from "../../config/urls";
import { itAddTask } from "../../interfaces/itAddTask";

export const AddNewTask = async (task: itAddTask) => {
    const userToken  = sessionStorage.getItem('userToken') 
    const response = await fetch(`${base_url}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${userToken}`  
        },
        body: JSON.stringify(task)
    });
    switch (response.status) {
        case 200:
            return response.json();
        default:
            return response.status;
    }
};