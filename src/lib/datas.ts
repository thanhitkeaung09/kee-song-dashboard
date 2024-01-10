// import { fetchCategory } from '@/app/lib/datas';
// import { unstable_noStore as noStore } from 'next/cache';
import { Auth, PasswordType } from "./definitions";
import { API_URL } from "./api";
import axios from "axios";
import { getDecryptedToken, storeEncryptedToken } from "./utlis";
import { useRouter } from "next/navigation";

export async function fetchAuth(credentials: Auth) {
  // noStore();
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials);

    if (response.status === 200) {
      storeEncryptedToken(JSON.stringify(response.data));
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchLogout() {
  // const router = useRouter();
  // noStore();

  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(`${API_URL}/user/logout`, null, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        localStorage.removeItem("encryptedToken");
        // console.log(response);
        return response;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }

    // router.push('/');
  }
}

export async function fetchPasswordChange(credentials: PasswordType) {
  // noStore();
  if (credentials.password === credentials.passwordConfirm) {
    try {
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await axios.put(
        `${API_URL}/user/change-password`,
        payload
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return { message: "Password does not match", status: 404 };
  }
}

export async function fetchUser() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/user/getWithPagination?search=&pageSize=5&page=1`,
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

export async function fetchAllUser() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/user/getAll`, {
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

export async function fetchCreateUser(
  name: string,
  email: string,
  password: string,
  profileImage: any
) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        username: name,
        email,
        password,
        profile: profileImage,
      };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(`${API_URL}/user/create`, payload, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // console.log(response);
        return response.data.statusCode;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchUserPages() {
  try {
    const response = await fetchUser();
    const totalPages = Math.ceil(response.count / 5);
    // console.log(response);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
}

//not yet to use
export async function fetchOneUserById(id: any) {
  // console.log(id);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/user/getById/${id}`, {
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

export async function fetchUpdateUser(
  id: string,
  name: string,
  email: string,
  profileImage: any
) {
  // console.log(`>>>>>>>>>>>${email}>>>>>>>>>>${name}>>>>>>${id}`);
  // noStore();
  const token = getDecryptedToken();
  const payload = { username: name, email, profile: profileImage };
  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/user/update/${id}`,
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

export async function fetchUserDebounceSearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/user/getWithPagination?search=${keyword}&pageSize=5&page=1`,
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

export async function fetchUserWithPagination(page: any) {
  // console.log(page)
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/user/getWithPagination?search=&pageSize=5&page=${page}`,
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

export async function fetchDeleteUser(id: any) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(`${API_URL}/user/delete/${id}`, {
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

export async function fetchCreateCategory(name: string) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = { name };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(
          `${API_URL}/category/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
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

export async function fetchCategory() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/category/getAll`, {
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

export async function fetchCategoryPages() {
  try {
    const response = await fetchCategory();
    // console.log(response);
    const totalPages = Math.ceil(response.length / 5);
    // console.log(response);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategoryWithPagination(page: any) {
  // console.log(page)
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/category/getWithPagination?search=&pageSize=5&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
            },
          }
        );

        console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

//for 5 items in one page
export async function fetchCategoryWithPaginationFive() {
  // console.log(page)
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/category/getWithPagination?search=&pageSize=5&page=1`,
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

export async function fetchDeleteCategory(id: string) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(
          `${API_URL}/category/delete/${id}`,
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

export async function fetchUpdateCategory(id: string, name: string) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>${name}>>>>>>${id}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/category/update/${id}`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
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

export async function fetchOneCategoryById(id: any) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/category/getById/${id}`, {
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

export async function fetchDebounceCategorySearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/category/getWithPagination?search=${keyword}&pageSize=5&page=1`,
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

export async function fetchProduct() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/product/getWithPagination?search=&pageSize=5&page=1`,
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

export async function fetchUpdateProduct(
  id: string,
  name: string,
  categoryId: string,
  sku: string
) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>${categoryId}>>>>>>${id}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = { name, category: categoryId, sku };
      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/product/update/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
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

export async function fetchCreateProduct(
  name: string,
  categoryId: string,
  sku: string
) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = { name, category: categoryId, sku };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(
          `${API_URL}/product/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jsonToken.data.token}`,
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

export async function fetchOneProductById(id: any) {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/product/getById/${id}`, {
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

export async function fetchProductDelete(id: string) {
  console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(`${API_URL}/product/delete/${id}`, {
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

export async function fetchPages() {
  try {
    const response = await fetchProduct();
    const totalPages = Math.ceil(response.count / 5);
    // console.log(response);
    return totalPages;
  } catch (error) {
    console.log(error);
  }

  // console.log(response);
  // .then(response => {
  //     // console.log(response.count)
  //     const totalPages = Math.ceil(response.count / 5);
  //     // console.log(totalPages);
  //     return totalPages;
  // })
  // .catch(err => console.log(err))
  // console.log(response);
}

export async function fetchProductsWithPagination(page: any) {
  // console.log(page)
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/product/getWithPagination?search=&pageSize=5&page=${page}`,
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

export async function fetchDebounceSearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/product/getWithPagination?search=${keyword}&pageSize=5&page=1`,
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

export async function fetchAllProduct() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/product/getAll`, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        console.log(response);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchOverview() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/user/getOverviewData`, {
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
