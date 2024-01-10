// import { Auth, PasswordType } from './definitions';
// import { API_URL } from './api';
import { API_URL } from "@/lib/api";
import { getDecryptedToken } from "@/lib/utlis";
import axios from "axios";
// import { getDecryptedToken, storeEncryptedToken } from './utlis';
import { useRouter } from "next/navigation";

export async function fetchUserByAuth() {
  // noStore();
  const token = getDecryptedToken();

  if (token && token.data) {
    try {
      const jsonToken = JSON.parse(token.data);
      // Check if jsonToken.data exists
      if (jsonToken.data) {
        const response = await axios.get(`${API_URL}/user/getByAuth`, {
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
  // console.log(payload);
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
