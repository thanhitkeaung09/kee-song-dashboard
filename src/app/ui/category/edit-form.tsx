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
import { useEffect, useState } from "react";
import {
  fetchCreateCategory,
  fetchOneCategoryById,
  fetchUpdateCategory,
} from "@/lib/datas";
// import { useRouter } from 'next/navigation';
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<any>("");
  // console.log(window.location.href);
  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const lastSegment = url.pathname.split("/").pop();
      // console.log(lastSegment);
      const response = await fetchOneCategoryById(lastSegment);
      if (response) {
        setName(response.name);
        setId(lastSegment);
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
    const response = await fetchUpdateCategory(id, name);
    if (response == 200) {
      setLoading(true);
      router.push("/dashboard/category");
    }
    toast.success("Category is successfully updated!");

    // const response = await fetchCreateCategory(name);
    // if(response == 200){
    //   setLoading(true);
    //   router.push("/dashboard/category");
    // }
    // router.push("/dashboard/category");
    // alert("Created Successfully");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Category Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Category Name"
                variant="outlined"
                required
              />
              {/* <input
                id="amount"
                name="name"
                type="text"
                step="0.01"
                placeholder="Enter category name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                // required
              />
              <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/category"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Category"}
        </Button>
      </div>
    </form>
  );
}
