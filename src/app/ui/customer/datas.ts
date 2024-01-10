import { unstable_noStore as noStore } from "next/cache";
// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import axios from "axios";
// import { getDecryptedToken } from './utlis';
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getDecryptedToken } from "@/lib/utlis";

export async function fetchAllCustomerWithPagination() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/customer/getWithPagination?search=&pageSize=5&page=1`,
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

export async function fetchAllCustomerWithPaginationPage(page: string) {
  // noStore();
  const token = getDecryptedToken();
  // console.log(`Page is >>>>>>${page}`);
  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/customer/getWithPagination?search=&pageSize=5&page=${page}`,
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

export async function fetchCustomer() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/customer/getAll`, {
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

export async function fetchCustomerPages() {
  try {
    const response = await fetchCustomer();
    // console.log(response);

    const totalPages = Math.ceil(response.length / 5);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDebounceCustomerSearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/customer/getWithPagination?search=${keyword}&pageSize=5&page=1`,
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

export async function fetchAllCompany() {
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

export async function fetchCreateCustomer(
  name: string,
  email: string,
  password: string,
  companyId: string,
  profileImage: any
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        name,
        email,
        password,
        company: companyId,
        profile: profileImage,
      };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(
          `${API_URL}/customer/create`,
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

export async function fetchOneCustomerById(id: any) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/customer/getById/${id}`, {
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

export async function fetchUpdateCustomer(
  name: string,
  email: string,
  companyId: string,
  id: string,
  profileImage: any
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        name,
        email,
        company: companyId,
        profile: profileImage,
      };
      // console.log(payload);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/customer/update/${id}`,
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

export async function fetchDeleteCustomer(id: string) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(
          `${API_URL}/customer/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
            },
          }
        );

        // console.log(response);
        return response;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}
