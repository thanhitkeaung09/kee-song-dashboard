import  CryptoJS  from 'crypto-js';
import { TokenType } from './definitions';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// const router = useRouter();


const secretKey : any = process.env.secret_key;
// CHange time format to localtime

export const formatDateToLocal = (dateStr : any,locale='en-US') => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

// Encrypt the token with crypto js
export const storeEncryptedToken = (token: string) => {
 
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  localStorage.setItem('encryptedToken', encryptedToken);
  // console.log(`>>>>>the token is ${token}`);
};

// Decrypt the token from the locastorage

export const getDecryptedToken = () : TokenType => {
  const encryptedToken = localStorage.getItem('encryptedToken');
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken =  bytes.toString(CryptoJS.enc.Utf8);
    return { data: decryptedToken};
  }
  return null;
};

// Redirect to login if token does not exists

// export const redirectToLogin = () =>{
//   // const router = useRouter()
//   // useEffect(() => {
//       const token = getDecryptedToken();
  
//       // Check if token exists and has a 'data' property
//       if (token && token.data) {
//         try {
//           const jsonToken = JSON.parse(token.data);
  
//           // Check if jsonToken.data exists
//           if (jsonToken.data) {
//             // router.push('/dashboard');
//             return jsonToken; // Exit the function to prevent further execution
//           }
//         } catch (error) {
//           console.error('Error parsing JSON token:', error);
//         }
//       }
  
//       // If any of the checks fail, redirect to the default route
//       // router.push('/');
//     // }, []);
// }

// Redirect to dashboard if token exists on login page
// export const redirectToDashboard = () =>{
//   useEffect(() => {
//       const token = getDecryptedToken();
  
//       // Check if token exists and has a 'data' property
//       if (token && token.data) {
//         try {
//           const jsonToken = JSON.parse(token.data);
  
//           // Check if jsonToken.data exists
//           if (jsonToken.data) {
//             router.push('/dashboard');
//             return; // Exit the function to prevent further execution
//           }
//         } catch (error) {
//           console.error('Error parsing JSON token:', error);
//         }
//       }
  
//       // If any of the checks fail, redirect to the default route
//       router.push('/');
//     }, [router]);
// }

// //Redirect to any route
// export const redirectToCustomRoute = (route : string) => {
//   // const router = useRouter();
//   useEffect(()=>{
//     const response = redirectToLogin();
//     console.log(response);
//     if(response?.statusCode == 200){
//       router.push(route);
//     }
//     else{
//       router.push("/")
//     }
//   },[])
// }

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


