"use client";
// import { CustomerField } from '@/app/lib/definitions';
import Link from "next/link";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
// import { createInvoice } from '@/app/lib/action';
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { fetchLogout, fetchPasswordChange } from "@/lib/datas";
import { Alert, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { fetchUserByAuth } from "./datas";
// import { redirectToLogin } from '@/app/lib/utlis';

export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserByAuth();
      // console.log(response);
      setEmail(response.email);
    };
    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(
    //   `>>>>>${email} >>>>>${password} >>>>>${passwordConfirm} >>>>>${currentPassword}`
    // );
    const credentials = { email, password, passwordConfirm };
    const response = await fetchPasswordChange(credentials);
    // console.log(response);
    if (response?.status == 404) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      setLoading(true);
      await fetchLogout();
      router.push("/");
      // setLoading(false)
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {error ? (
        <Alert severity="error">Password Confirmation does not match!</Alert>
      ) : (
        ""
      )}
      <div className="">
        <input type="text" value={email} onChange={() => setEmail("")} hidden />
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Current Password */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Your Current Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentPassword}
                fullWidth
                onChange={(e) => setCurrentPassword(e.target.value)}
                id="outlined-basic"
                label="Current Password"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="email"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="text"
                step="0.01"
                placeholder="Enter your current password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                // required
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter New Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                step="0.01"
                placeholder="Enter New Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Confirm New Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={passwordConfirm}
                fullWidth
                onChange={(e) => setPasswordConfirm(e.target.value)}
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                required
              />

              {/* <input
                id="amount"
                name="password_confirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="text"
                step="0.01"
                placeholder="Confirm New Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/user"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
