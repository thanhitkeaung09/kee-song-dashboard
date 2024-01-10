import { getDecryptedToken } from "@/lib/utlis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCheckAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getDecryptedToken();
        // console.log(token);

        if (token && token.data) {
          try {
            const jsonToken = JSON.parse(token.data);
            // console.log(jsonToken);
            // Check if jsonToken.data exists
            if (jsonToken.data) {
              router.push("/dashboard");
              return; // Exit the function to prevent further execution
            }
          } catch (error) {
            console.error("Error parsing JSON token:", error);
          }
        }

        // If any of the checks fail, redirect to the default route
        router.push("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [router]);
};
