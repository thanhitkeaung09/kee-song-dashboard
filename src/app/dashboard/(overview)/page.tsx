"use client";

import { getDecryptedToken } from "@/lib/utlis";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserPlusIcon,
  UserCircleIcon,
  Bars2Icon,
  GlobeAltIcon,
  ClipboardDocumentIcon,
  BuildingOfficeIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { fetchLogout, fetchOverview } from "@/lib/datas";
import { Backdrop, Typography } from "@mui/material";
import Image from "next/image";

interface OverviewData {
  userCount: number;
  productCount: number;
  categoryCount: number;
  locationLevelCount: number;
  companyCount: number;
  customerCount: number;
  // Add other properties as needed
}

export default function Page() {
  const [data, setUserData] = useState<OverviewData | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getDecryptedToken();
        if (token && token.data) {
          try {
            const jsonToken = JSON.parse(token.data); 
            // Check if jsonToken.data exists
            if (jsonToken.statusCode == 200) {
              router.push("/dashboard");
              return; // Exit the function to prevent further execution
            }
            //there may be other status code
            else {
              router.push("/");
              return;
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

  //Show the datas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOverview();
        if (data) {
          setUserData(data[0]);
        } else {
          localStorage.removeItem("encryptedToken");
          const response = await fetchLogout();
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:");
      }
    };

    fetchData();
  }, [router]);

  const handleClose = () => {
    // setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="h-[2000px]">
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
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Overview</h1>
      </div>
      {/* Card UI with NavLink */}
      <div className="grid grid-cols-12 gap-3 ">
        {/* User Count */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <UserGroupIcon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/user"} onClick={handleOpen}>
                Total User
              </Link>
              <p>{data?.userCount}</p>
            </div>
          </div>
        </div>
        {/* Product Count */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <DocumentDuplicateIcon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/products"} onClick={handleOpen}>
                Total Product
              </Link>
              <p>{data?.productCount}</p>
            </div>
          </div>
        </div>
        {/* Category Count */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <Bars2Icon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/category"} onClick={handleOpen}>
                Total Category
              </Link>
              <p>{data?.categoryCount}</p>
            </div>
          </div>
        </div>
        {/* Location Level Count */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <AdjustmentsHorizontalIcon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/level"} onClick={handleOpen}>
                Total Location Level
              </Link>
              <p>{data?.locationLevelCount}</p>
            </div>
          </div>
        </div>
        {/* Total Company */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <BuildingOfficeIcon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/company"} onClick={handleOpen}>
                Total Company
              </Link>
              <p>{data?.companyCount}</p>
            </div>
          </div>
        </div>
        {/* Total Customer */}
        <div className="col-span-3 h-10 my-10 ">
          <div className="border flex items-center p-5 justify-between">
            <div className="">
              <UserIcon className="w-10" />
            </div>
            <div className="">
              <Link href={"/dashboard/customer"} onClick={handleOpen}>
                Total Customer
              </Link>
              <p>{data?.customerCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
