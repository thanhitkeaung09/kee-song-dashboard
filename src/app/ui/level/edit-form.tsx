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
// import { fetchAllLocationLevel, fetchCreateLocation } from './datas';
import { useRouter } from "next/navigation";
import { fetchCreateLocation } from "../location/datas";
import { fetchCreateLevel, fetchOneLevelById, fetchUpdateLevel } from "./datas";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
// import { fetchAllCompany, fetchCreateCustomer, fetchCustomer } from './datas';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(window.location.href);
        const lastSegment = url.pathname.split("/").pop();
        // console.log(lastSegment);
        const response = await fetchOneLevelById(lastSegment);
        // console.log(response);
        if (response) {
          // console.log(response);
          setName(response.name);
          setId(lastSegment);
        } else {
          router.push("/dashboard/category");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(name);

    const response = await fetchUpdateLevel(name, id);
    // console.log(response);
    // // // console.log(response);
    if (response === 200) {
      setLoading(true);
      router.push("/dashboard/level");
    }
    toast.success("Location Level is successfully updated!");

    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Location Level Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Location Level"
                variant="outlined"
                required
              />
              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter location level name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/level"
          className="flex h-10 py-7 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Location Level"}
        </Button>
      </div>
    </form>
  );
}
