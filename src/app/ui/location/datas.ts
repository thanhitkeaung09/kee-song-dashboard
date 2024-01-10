// import { unstable_noStore as noStore } from 'next/cache';
// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import axios from "axios";
// import { getDecryptedToken } from './utlis';
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getDecryptedToken } from "@/lib/utlis";

export async function fetchLocation() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/location/getWithPagination?search=&pageSize=5&page=1`,
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

export async function fetchLocationWithPagination(page: any) {
  // console.log(`>>>>>>>>>>>>>>${page}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/location/getWithPagination?search=&pageSize=5&page=${page}`,
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

export async function fetchLocationPages() {
  try {
    const response = await fetchLocation();
    const totalPages = Math.ceil(response.count / 5);
    // console.log(response);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeleteLocation(id: string) {
  // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>${id}<<<<<<<<<<<<<<<<<<<<<<<<<<`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.delete(
          `${API_URL}/location/delete/${id}`,
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

export async function fetchDebounceLocationSearch(keyword: string) {
  // console.log(keyword);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/location/getWithPagination?search=${keyword}&pageSize=10&page=1`,
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

export async function fetchAllLocationLevel() {
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
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchCreateLocation(
  levelId: string,
  row: string,
  column: string
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        bin: levelId,
        row: parseInt(row),
        column: parseInt(column),
      };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.post(
          `${API_URL}/location/create`,
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

export async function fetchOneLocationById(id: any) {
  // noStore();
  // console.log(id);
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/location/getbyid/${id}`, {
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

export async function fetchUpdateLocation(
  levelId: string,
  row: string,
  column: string,
  id: string
) {
  // console.log(`>>>>>>${levelId}>>>>${row}>>>>>${column}`);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        location_level_id: parseInt(levelId),
        row: parseInt(row),
        column: parseInt(column),
      };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/location/update/${id}`,
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

export async function fetchAllLocation() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/location/getAll`, {
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

export async function fetchBinsByLocationId(id: any) {
  // console.log(id);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(
          `${API_URL}/bin/getByLocationLevel/${id}`,
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

export async function fetchLocationByBin(id: any) {
  // console.log(id);
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/location/getByBin/${id}`, {
          headers: {
            Authorization: `Bearer ${jsonToken.data.token}`,
          },
        });

        // console.log(response);
        return response.data;
      }
    } catch (error) {
      console.error("Error parsing JSON token:", error);
    }
  }
}

export async function fetchUpdateLocationForProductSave(
  binId: string,
  row: string,
  column: string,
  id: string,
  productId: string,
  // customerId: string,
  quantity: string
) {
  // console.log(
  //   `>>>>>>${binId}>>>>${row}>>>>>${column} >>>${id} >>>${productId}>>>${customerId}>>>${quantity}`
  // );
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      const payload = {
        bin: binId,
        row: parseInt(row),
        column: parseInt(column),
        product: productId,
        // customer: customerId,
        quantity: parseInt(quantity),
      };

      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.patch(
          `${API_URL}/location/update/${id}`,
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
