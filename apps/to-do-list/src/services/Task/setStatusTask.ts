import { base_url } from "../../config/urls";

export const setStatusTask = async (id: string, status: string) => {
    const userToken = sessionStorage.getItem('userToken')
    const response = await fetch(`${base_url}/task/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${userToken}`
        },
        body: JSON.stringify({ status })
    });
    switch (response.status) {
        default:
            return response.status;
    }
};