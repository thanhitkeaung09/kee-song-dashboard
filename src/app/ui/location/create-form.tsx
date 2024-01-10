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
import { fetchAllLocationLevel, fetchCreateLocation } from "./datas";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { fetchBins } from "../bin/datas";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [locations, setLocation] = useState<any[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [row, setRow] = useState<string>("");
  const [column, setColumn] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBins();
        // console.log(data);
        setLocation(data);
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
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetchCreateLocation(locationId, row, column);
    // console.log(`>>>>>>>>>>>${response}`);
    setLoading(true);

    if (response === 200) {
      router.push("/dashboard/location");
      toast.success("Location is successfully created!");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 3000);
    }
    // console.log(
    //   `>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`
    // );
    // alert("this is location create event");
  };

  return (
    <>
      <div className={`${error ? "block" : "hidden"}`}>
        <Alert severity="error">Location is already exist!</Alert>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/*Name */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter Bin
            </label>
            <div className="relative mt-2 rounded-md">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Bin</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={locationId}
                    label="Bin"
                    onChange={(e) => setLocationId(e.target.value)}
                    className=""
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                    {locations?.map((location: any) => (
                      <MenuItem
                        sx={{ padding: "0px" }}
                        key={location.id}
                        value={location.id}
                      >
                        {location.name}
                      </MenuItem>
                    ))}
                    {/* <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                  </Select>
                </FormControl>
              </Box>
              {/* 
            <div className="relative">
              <Select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 pl-7 text-sm outline-2 placeholder:text-gray-500"
                value={locationId}
                label="Bin"
                onChange={(e) => setLocationId(e.target.value)}
                required
                // defaultValue={"None"}
              >
                <MenuItem value="">
                  <em className="text-black">None</em>
                </MenuItem>
                {locations?.map((location: any) => (
                  <MenuItem
                    sx={{ padding: "0px" }}
                    key={location.id}
                    value={location.id}
                  >
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div> */}
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter row
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter the row"
                  className="peer block w-full rounded-md border border-gray-200 py-4 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  // to show the amount error one set
                  aria-describedby="amount-error"
                  required
                  value={row}
                  onChange={(e) => setRow(e.target.value)}
                />
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter column
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter the column"
                  className="peer block w-full rounded-md border border-gray-200 py-4 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  // to show the amount error one set
                  aria-describedby="amount-error"
                  required
                  value={column}
                  onChange={(e) => {
                    setColumn(e.target.value);
                  }}
                />
                <EllipsisHorizontalCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/location"
            className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting" : "Create Location"}
          </Button>
        </div>
      </form>
    </>
  );
}
