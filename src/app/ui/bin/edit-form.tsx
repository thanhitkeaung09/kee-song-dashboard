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
import {
  fetchAllLocation,
  fetchAllLocationLevel,
  fetchLocation,
  fetchOneLocationById,
} from "../location/datas";
import { fetchAllProduct } from "@/lib/datas";
import { fetchCreateBin, fetchOneBinById, fetchUpdateBin } from "./datas";
import { fetchOneLevelById } from "../level/datas";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
// import { fetchAllCompany, fetchCreateCustomer, fetchCustomer } from './datas';
// import { fetchCreateCompany } from './datas';

export default function Form() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [levelId, setLevelId] = useState<string>("");
  const [levels, setLevel] = useState<any[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [locations, setLocation] = useState<any[]>([]);

  const [productId, setProductId] = useState<string>("");
  const [products, setProduct] = useState<any[]>([]);
  const [id, setId] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const levels = await fetchAllLocationLevel();
        setLevel(levels);
        // console.log(levels);
        const locations = await fetchAllLocation();
        setLocation(locations);
        // console.log(locations);

        const products = await fetchAllProduct();
        setProduct(products);
        // console.log(products);

        const url = new URL(window.location.href);
        const lastSegment = url.pathname.split("/").pop();
        // console.log(lastSegment);
        // const response = await fetchOneBinById(lastSegment);
        const response = await fetchOneLevelById(lastSegment);

        // console.log(response);
        if (response) {
          // console.log(response);
          // setName(response.name);
          // setQuantity(response.quantity);
          setLevelId(response._id);
          // setLocationId(response.location.id);
          // setProductId(response.product.id);

          //   setEmail(response.email);
          //   setPassword(response.password);
          //   setCompanyId(response.company.id);
          setId(lastSegment);
        } else {
          // router.push("/dashboard/category");
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
    // console.log(quantity);
    // console.log(levelId);
    // console.log(locationId);
    // console.log(productId);

    // to start here

    const response = await fetchCreateBin(name, levelId);
    // console.log(response);
    setLoading(true);
    // console.log(response);
    if (response === 200) {
      setLoading(true);
      router.push("/dashboard/location");
      toast.success("Bin is successfully created!");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 3000);
    }
    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  };

  return (
    <>
      <div className={`${error ? "block" : "hidden"}`}>
        <Alert severity="error">Bin is already exist!</Alert>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Enter name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label="Bin"
                  variant="outlined"
                  required
                />
                {/* <input
                  id="amount"
                  name="amount"
                  type="text"
                  step="0.01"
                  placeholder="Enter the customer name"
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

          {/* quantity */}
          {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter the quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter the quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div> */}

          {/*Choose Location Level id */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Choose Location Level
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={levelId}
                      label="Location Level"
                      onChange={(e) => setLevelId(e.target.value)}
                    >
                      {levels?.map((level: any) => (
                        // <option key={level.id} value={level.id}>
                        //   {level.name}
                        // </option>
                        <MenuItem key={level.id} value={level.id}>
                          {level.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* <select
                  id="category"
                  name="category_id"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  value={levelId}
                  onChange={(e) => setLevelId(e.target.value)}
                  required
                  // defaultValue={categoryId}
                >
                  <option value="" disabled>
                    None
                  </option>

                  {levels?.map((level: any) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
                <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>

          {/*Choose Location Level id */}
          {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose the Location
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={locationId}
                onChange={(e)=>setLocationId(e.target.value)}
                required
                // defaultValue={categoryId}
              >
                <option value="" disabled>None</option>
                
                {locations?.map((location: any) => (
                  <option key={location.id} value={location.id}>
                    {location.id}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div> */}

          {/*Choose Location Level id */}
          {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose the Product
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={productId}
                onChange={(e)=>setProductId(e.target.value)}
                required
                // defaultValue={categoryId}
              >
                <option value="" disabled>None</option>
                
                {products?.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div> */}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/location"
            className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          {/* actual eidt bin route */}
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting" : "Create Bin"}
          </Button>
        </div>
      </form>
    </>
  );
}
