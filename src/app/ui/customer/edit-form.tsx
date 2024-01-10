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
  fetchAllCompany,
  fetchCreateCustomer,
  fetchCustomer,
  fetchOneCustomerById,
  fetchUpdateCustomer,
} from "./datas";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";
// import { fetchCreateCompany } from './datas';

export default function Form() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [company, setCompany] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<any>("");

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllCompany();
        console.log(data);
        setCompany(data);

        const url = new URL(window.location.href);
        const lastSegment = url.pathname.split("/").pop();
        // console.log(lastSegment);
        const response = await fetchOneCustomerById(lastSegment);
        // console.log(response);
        if (response) {
          console.log(response);
          setName(response.name);
          setEmail(response.email);
          setPassword(response.password);
          setCompanyId(response.company.id);
          setImage(response.profile);
          setId(lastSegment);
        } else {
          router.push("/dashboard/category");
        }
        // console.log(data);
        // setCategory(data.categories);
        // const totalPages = await fetchCategoryPages();
        // console.log(data);
        // console.log(totalPages);
        // setUserData(data.categories);
        // setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(id);
    // console.log(email);
    // console.log(password);
    console.log(companyId);
    const response = await fetchUpdateCustomer(
      name,
      email,
      companyId,
      id,
      profileImage
    );
    // console.log(response);
    // // // console.log(response);
    if (response === 200) {
      setLoading(true);
      router.push("/dashboard/customer");
    }
    toast.success("Customer is successfully updated!");

    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {/* Profile Image */}
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
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Customer Name"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter customer name"
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

        {/* email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="outlined-basic"
                label="Customer Email"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter customer email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>

        {/* password */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic"
                label="Customer Password"
                variant="outlined"
                required
              /> */}

        {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
        {/* </div>
          </div>
        </div> */}

        {/*Choose Company */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Company
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Company</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={companyId}
                    label="Company"
                    onChange={(e) => setCompanyId(e.target.value)}
                  >
                    {company?.map((single_company: any) => (
                      // <option key={category.id} value={category.id}>
                      //   {category.name}
                      // </option>
                      <MenuItem
                        key={single_company.id}
                        value={single_company.id}
                      >
                        {single_company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* <select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
                // defaultValue={categoryId}
              >
                <option value="" disabled>
                  None
                </option>
                {company?.map((single_company: any) => (
                  <option key={single_company.id} value={single_company.id}>
                    {single_company.name}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customer"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Customer"}
        </Button>
      </div>
    </form>
  );
}
