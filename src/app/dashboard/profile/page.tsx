'use client';

import { getDecryptedToken } from "@/lib/utlis";
import Form from "@/app/ui/profile/create-form";
import Breadcrumbs from "@/app/ui/worker/breadcrumbs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
  const router = useRouter();
    //Redirect to Back
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = getDecryptedToken();
          console.log(token);
          if (token && token.data) {
                    try {
                      const jsonToken = JSON.parse(token.data);
              
                      // Check if jsonToken.data exists
                      if (jsonToken.data) {
                        router.push('/dashboard/profile');
                        return; // Exit the function to prevent further execution
                      }
                    } catch (error) {
                      console.error('Error parsing JSON token:', error);
                    }
                  }
              
                  // If any of the checks fail, redirect to the default route
                  router.push('/');
  
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchData();
    }, [router]); 
  return (
    <div className="">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'User', href: '/dashboard/user' },
          {
            label: 'Edit Profile',
            href: '/dashboard/profile',
            active: true,
          },
        ]}
      />
      <Form/>
    </div>
  );
}