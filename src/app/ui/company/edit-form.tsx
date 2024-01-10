"use client";
// import { CustomerField } from '@/app/lib/definitions';
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  UserCircleIcon,
  BeakerIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { createInvoice } from '@/app/lib/action';
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
// import { fetchAllLocationLevel, fetchCreateLocation } from './datas';
import { useRouter } from "next/navigation";
import {
  fetchCreateCompany,
  fetchOneCompanyById,
  fetchUpdateCompany,
} from "./datas";
import { TextField } from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<any>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const lastSegment = url.pathname.split("/").pop();
      // console.log(lastSegment);
      const response = await fetchOneCompanyById(lastSegment);
      console.log(response);
      if (response) {
        setName(response.name);
        setSize(response.size);
        setId(lastSegment);
        setImage(response.logo);
      } else {
        router.push("/dashboard/category");
      }
      // console.log(response);
    };
    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(name);
    // console.log(size);
    // console.log(`${profileImage}`);
    const response = await fetchUpdateCompany(name, size, id, profileImage);
    // console.log(response);
    // console.log(response);
    if (response === 200) {
      setLoading(true);
      router.push("/dashboard/company");
    }
    toast.success("Company is successfully updated!");

    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {/* Logo */}
      <div
        className="mb-4 cursor-pointer w-32 h-32 rounded-full overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {profileImage ? (
          <Image
            src={URL.createObjectURL(profileImage)}
            height={500}
            width={500}
            alt="Profile Preview"
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          // Default profile image
          <Image
            height={500}
            width={500}
            src={image ? image : "/user-icon.jpg"}
            alt="Profile"
            className="object-cover w-full h-full rounded-full"
          />
        )}
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          ref={fileInputRef}
        />
        {/* <div className="absolute top-0 right-0 p-2 text-white bg-gray-500 rounded-full cursor-pointer">
            <PencilSquareIcon />
          </div> */}
      </div>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Company Size"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter the company name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Size
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={size}
                type="text"
                onChange={(e) => setSize(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Company Size"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter the company size"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/company"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Company"}
        </Button>
      </div>
    </form>
  );
}
