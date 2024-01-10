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
  fetchCategory,
  fetchCreateCategory,
  fetchCreateProduct,
} from "@/lib/datas";
import { useRouter } from "next/navigation";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [categories, setCategory] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategory();
        // console.log(data);
        setCategory(data);
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
    const response = await fetchCreateProduct(name, categoryId, sku);
    // console.log(response);
    if (response === 200) {
      setLoading(true);

      router.push("/dashboard/products");
    }
    toast.success("Product is successfully created!");

    // alert("this is product create event");
    // console.log(`>>>>>>>>>${name}>>>>>>>>>>>${categoryId}>>>>>>>>>>>>>>${sku}`);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Product Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Product Name"
                variant="outlined"
                required
              />
              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter product name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Category
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
                    value={categoryId}
                    label="Category"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categories?.map((category: any) => (
                      // <option key={category.id} value={category.id}>
                      //   {category.name}
                      // </option>
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* <select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                // defaultValue={categoryId}
              >
                <option value="" disabled>
                  None
                </option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter Sku
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Sku"
                variant="outlined"
                required
              />
              {/* <input
                id="amount"
                name="amount"
                type="text"
                step="0.01"
                placeholder="Enter sku"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // to show the amount error one set
                aria-describedby="amount-error"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <EllipsisHorizontalCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex py-7 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
