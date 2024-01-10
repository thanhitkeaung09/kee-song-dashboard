// import { unstable_noStore as noStore } from 'next/cache';
// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import axios from 'axios';
// import { getDecryptedToken } from './utlis';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { getDecryptedToken } from '@/lib/utlis';

export async function fetchAllLevelWithPagination(){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/location_level/getWithPagination?search=&pageSize=5&page=1`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchLevels(){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/location_level/getAll`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchLevelPages(){
    try {
        const response = await fetchLevels();
        // console.log(response);

        const totalPages = Math.ceil(response.length / 5);
        return totalPages;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchAllLevelWithPaginationPage(page : string){
    // noStore();
    const token = getDecryptedToken();
    // console.log(`Page is >>>>>>${page}`);
    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/location_level/getWithPagination?search=&pageSize=5&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchDebounceLevelSearch(keyword : string){
    // console.log(keyword);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/location_level/getWithPagination?search=${keyword}&pageSize=5&page=1`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchCreateLevel(name : string ){
    // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);
            const payload = {name}

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.post(`${API_URL}/location_level/create`, payload ,{
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.statusCode;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchUpdateLevel(name : string , id : string){
    // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);
            const payload = {name}

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.patch(`${API_URL}/location_level/update/${id}`, payload ,{
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.statusCode;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchDeleteLevel(id : string){
    // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.delete(`${API_URL}/location_level/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}


export async function fetchOneLevelById(id : any){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/location_level/getById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                // console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}