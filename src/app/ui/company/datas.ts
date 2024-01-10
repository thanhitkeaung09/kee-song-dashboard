// import { unstable_noStore as noStore } from 'next/cache';
// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import axios from "axios";
// import { getDecryptedToken } from './utlis';
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getDecryptedToken } from "@/lib/utlis";

export async function fetchAllCompanyWithPaginationPage(page: string) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/company/getWithPagination?search=&pageSize=5&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
            },
          }
        );

        // console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchAllCompanyWithPagination() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/company/getWithPagination?search=&pageSize=5&page=1`,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
            },
          }
        );

        // console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchCreateCompany(
  name: string,
  size: string,
  profileImage: any
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = { name, size, logo: profileImage };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(
          `${API_URL}/company/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(response);
        return response.data.statusCode;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchCompany() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/company/getAll`, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        // console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchCompanyPages() {
  try {
    const response = await fetchCompany();
    // console.log(response);

    const totalPages = Math.ceil(response.length / 5);
    return totalPages;
  } catch (error) {
    // console.log(error);
  }
}

export async function fetchDebounceCompanySearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/company/getWithPagination?search=${keyword}&pageSize=10&page=1`,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
            },
          }
        );

        // console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchDeleteCompany(id: string) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(`${API_URL}/company/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        // console.log(response);
        return response;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchOneCompanyById(id: any) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/company/getbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        // console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchUpdateCompany(
  name: string,
  size: string,
  id: string,
  profileImage: any
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = { name, size, logo: profileImage };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/company/update/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(response);
        return response.data.statusCode;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}
