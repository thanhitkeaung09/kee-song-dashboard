"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";
import { Backdrop, Typography } from "@mui/material";
import { fetchUserByAuth } from "../profile/datas";
import { fetchLogout } from "@/lib/datas";

interface UserData {
  profile: string;
  username: string;
  email: string;
}

export default function Page() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>();
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // console.log(router.refresh());
    setOpen(false);

    const fetchData = async () => {
      const response = await fetchUserByAuth();
      if (response) {
        setUserData(response);
      } else {
        localStorage.removeItem("encryptedToken");
        await fetchLogout();
        router.push("/");
      }
      // console.log("this is profile data fetching......");
      // console.log(response);
    };
    fetchData();
  }, [pathname, router]);

  const handleClose = () => {
    // setOpen(false);
    // console.log(pathname);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const links = [
    { name: "Edit Profile", href: "/dashboard/profile" },
    { name: "Edit Password", href: "/dashboard/profile/password/edit" },
  ];
  const toggleDropdown = () => {
    // alert("hello drop down");
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
          <div className="flex flex-col items-center justify-center">
            <Image
              width={150}
              height={150}
              src="/kee-song-logo.gif"
              alt="Profile"
              className=""
            />
            <Typography variant="h6">Loading....</Typography>
          </div>
        </Backdrop>
      </div>

      <nav className="flex items-center justify-between  text-white py-2 px-12 bg-white backdrop-blur-md backdrop-filter bg-opacity-10 sticky top-0 shadow-sm z-10">
        <div className="flex items-center space-x-4">
          {/* <span className=" text-black font-bold">Kee Song Admin Portal</span> */}
          <Image
            src="/kee-song-logo.gif"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          {/* Add more navigation items as needed */}
        </div>
        <div className="flex items-center space-x-4 relative">
          <div className="text-black">
            <div className="w-2 h-2 bg-red-500 rounded-lg absolute"></div>
            <BellIcon className="w-6" />
          </div>
          <div className="cursor-pointer" onClick={toggleDropdown}>
            {/* <span>User Name</span> */}
            {userData?.profile ? (
              <Image
                width={50}
                height={50}
                src={userData?.profile}
                alt="Profile"
                className="object-cover h-10 w-10 rounded-full"
              />
            ) : (
              <Image
                width={50}
                height={50}
                src="/user-icon.jpg"
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute w-48 top-full right-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-md z-20">
              <div className="">
                {/* <div className="">
                  <h1 className="text-black">Min Ga Lar Par</h1>
                </div> */}
                <div className="p-3">
                  <p className="text-black font-semibold pb-3">
                    {userData?.username}
                  </p>
                  <p className="text-gray-500">{userData?.email}</p>
                </div>

                {links.map((link) => {
                  // const LinkIcon = link.icon;
                  return (
                    <>
                      <Link
                        onClick={handleOpen}
                        key={link.name}
                        href={link.href}
                        className={clsx(
                          "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                          {
                            "bg-sky-100 text-blue-600": pathname === link.href,
                          }
                        )}
                      >
                        {/* <LinkIcon className="w-6" /> */}
                        <p className="hidden md:block">{link.name}</p>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
