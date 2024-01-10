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
  fetchAllLocationLevel,
  fetchCreateLocation,
  fetchOneLocationById,
  fetchUpdateLocation,
  fetchUpdateLocationForProductSave,
} from "./datas";
import { useRouter } from "next/navigation";
import { fetchAllProduct } from "@/lib/datas";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchCustomer } from "../customer/datas";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [locations, setLocation] = useState<any[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [row, setRow] = useState<string>("");
  const [column, setColumn] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<any>("");

  const [products, setProduct] = useState<any[]>([]);
  const [productId, setProductId] = useState<string>("");

  const [customers, setCustomer] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<string>("");

  const [quantity, setQuantity] = useState<string>("");
  const [binId, setBinId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      // get bin id , row , column by fetching fetchOneLocationById
      const url = new URL(window.location.href);
      const lastSegment = url.pathname.split("/").pop();
      // console.log(lastSegment);
      const response = await fetchOneLocationById(lastSegment);
      // console.log(response);
      const data = await fetchAllLocationLevel();
      // console.log(data);
      setLocation(data);
      if (response) {
        setBinId(response.bin.id);
        setRow(response.row);
        setColumn(response.column);
        // setName(response.name);
        setId(lastSegment);
      } else {
        router.push("/dashboard/category");
      }
      // console.log(response);

      //fetch products
      const product_response = await fetchAllProduct();
      // console.log(product_response);
      setProduct(product_response);
      //fetch customers

      const customer_response = await fetchCustomer();
      // console.log(customer_response);
      setCustomer(customer_response);
    };
    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetchUpdateLocationForProductSave(
      binId,
      row,
      column,
      id,
      productId,
      // customerId,
      quantity
    );
    // console.log(response);
    if (response === 200) {
      setLoading(true);
      router.push("/dashboard/location");
    }
    toast.success("Produt is successfully created!");

    // console.log(
    //   `>>>>>>>>>>${binId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}>>>>${id}>>>${productId}>>>>>${customerId}>>>>>${quantity}`
    // );
    // alert("this is location create event");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Product */}

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Product
          </label>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                label="Product"
                onChange={(e) => setProductId(e.target.value)}
              >
                <MenuItem disabled>None</MenuItem>
                {products?.map((product: any) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        {/* Customer */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Customer
          </label>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Customer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={customerId}
                label="Product"
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <MenuItem disabled>None</MenuItem>
                {customers?.map((customer: any) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div> */}

        {/* Quantity */}
        <div className="">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Quantity
          </label>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Email */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter the row
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter the row"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={row}
                onChange={(e) => setRow(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div> */}
        {/* Phone */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter the column
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter the column"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
        </div> */}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/location"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Update Location"}
        </Button>
      </div>
    </form>
  );
}
