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
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { createInvoice } from '@/app/lib/action';
import { useFormState } from "react-dom";
import React, { useRef, useState } from "react";
import { fetchCreateUser } from "@/lib/datas";
import { useRouter } from "next/navigation";
import { IconButton, Snackbar, TextField } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";

// import { NavigateOptions } from "next/navigation";

interface User {
  id: number;
  username: string;
}

export default function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [snackbaropen, setSnackBarOpen] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<User | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(profileImage);
    const response = await fetchCreateUser(
      username,
      email,
      password,
      profileImage
    );
    // console.log(response);
    if (response == 200) {
      setLoading(true);
      // to bug fix here
      // handleClick();
      router.push("/dashboard/user");

      // router.push({
      //   pathname: "/dashboard/user",
      //   query: { name: "create"},
      // });
      // handleClick();
    }
    toast.success("User is successfully created!");

    // alert("this is submit");
    // console.log(`<<<<<<<<<<<<${email}>>>>>>${username} <<<<<<<${password}`);
  };

  const handleClick = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {/* <Toaster /> */}
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
          {/*Name */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter Username
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {/* <input
                id="amount"
                name="username"
                type="text"
                step="0.01"
                placeholder="Enter username"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter Email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <input
                id="amount"
                name="email"
                type="text"
                step="0.01"
                placeholder="Enter email"
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
          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter Password
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <input
                id="amount"
                name="password"
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
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/user"
            className="flex h-10 py-7 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting" : "Create User"}
          </Button>
        </div>
      </form>

      {/* <Snackbar
        open={snackbaropen}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message={"User is created succefully"}
        action={action}
      /> */}
    </>
  );
}
