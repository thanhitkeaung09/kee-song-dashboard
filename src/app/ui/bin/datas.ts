// import { unstable_noStore as noStore } from 'next/cache';
// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import axios from 'axios';
// import { getDecryptedToken } from './utlis';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { getDecryptedToken } from '@/lib/utlis';

export async function fetchAllBinWithPagination(){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/bin/getWithPagination?search=&pageSize=5&page=1`, {
                    headers: {
                        Authorization: `Bearer ${jsonToken.data.token}`,
                    },
                });

                console.log(response);
                return response.data.data;
            }
        } catch (error) {
            console.error('Error parsing JSON token:', error);
        }
}
}

export async function fetchBins(){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/bin/getAll`, {
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

export async function fetchBinPages(){
    try {
        const response = await fetchBins();
        // console.log(response);

        const totalPages = Math.ceil(response.length / 5);
        return totalPages;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchDebounceBinSearch(keyword : string){
    // console.log(keyword);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/bin/getWithPagination?search=${keyword}&pageSize=5&page=1`, {
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

// export async function fetchCreateBin(name : string , quantity : string , levelId : string , locationId : string , productId : string){
//     // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
//     // noStore();
//     const token = getDecryptedToken();

//     if (token && token.data) {
//         try {
//             const jsonToken = JSON.parse(token.data);
//             const payload = {name,quantity :  parseInt(quantity),location_level_id : parseInt(levelId),product_id:parseInt(productId),location_id: parseInt(locationId)}

//             // Check if jsonToken.data exists
//             if (jsonToken.data) {
//                 const response = await axios.post(`${API_URL}/bin/create`, payload ,{
//                     headers: {
//                         Authorization: `Bearer ${jsonToken.data.token}`,
//                     },
//                 });

//                 console.log(response);
//                 return response.data.statusCode;
//             }
//         } catch (error) {
//             console.error('Error parsing JSON token:', error);
//         }
// }
// }

export async function fetchCreateBin(name : string  , levelId : string ){
    // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);
            const payload = {name : name,location_level : levelId}

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.post(`${API_URL}/bin/create`, payload ,{
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

export async function fetchOneBinById(id : any){
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/bin/getById/${id}`, {
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

export async function fetchUpdateBin(name : string , quantity : string , levelId : string , locationId : string , productId : string, id : string){
    // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);
            const payload = {name,quantity :  parseInt(quantity),location_level_id : parseInt(levelId),product_id:parseInt(productId),location_id: parseInt(locationId)}

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.patch(`${API_URL}/bin/update/${id}`, payload ,{
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

export async function fetchDeleteBin(id : string){
    // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
    // noStore();
    const token = getDecryptedToken();

    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.delete(`${API_URL}/bin/delete/${id}`, {
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

export async function fetchAllBinWithPaginationPage(page : string){
    // noStore();
    const token = getDecryptedToken();
    // console.log(`Page is >>>>>>${page}`);
    if (token && token.data) {
        try {
            const jsonToken = JSON.parse(token.data);

            // Check if jsonToken.data exists
            if (jsonToken.data) {
                const response = await axios.get(`${API_URL}/bin/getWithPagination?search=&pageSize=5&page=${page}`, {
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

