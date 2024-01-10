'use client';
// import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  UserCircleIcon,
  BeakerIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
// import { createInvoice } from '@/app/lib/action';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
// import { fetchAllLocationLevel, fetchCreateLocation } from './datas';
import { useRouter } from 'next/navigation';
import { fetchAllLocation, fetchAllLocationLevel, fetchLocation } from '../location/datas';
import { fetchAllProduct } from '@/lib/datas';
import { fetchCreateBin } from './datas';
// import { fetchAllCompany, fetchCreateCustomer, fetchCustomer } from './datas';
// import { fetchCreateCompany } from './datas';

export default function Form() {
  const router = useRouter();

  const [name,setName] = useState<string>('');
  const [quantity,setQuantity] = useState<string>('');
  const [levelId,setLevelId] = useState<string>('');
  const [levels,setLevel] = useState<any[]>([]);
  const [locationId,setLocationId] = useState<string>('');
  const [locations,setLocation] = useState<any[]>([]);

  const [productId,setProductId] = useState<string>('');
  const [products,setProduct] = useState<any[]>([]);

  const [loading,setLoading] = useState<boolean>(false);


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
        // setCompany(data);
        // console.log(data);
        // setCategory(data.categories);
        // const totalPages = await fetchCategoryPages();
        // console.log(data);
        // console.log(totalPages);
        // setUserData(data.categories);
        // setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    // console.log(name);
    // console.log(quantity);
    // console.log(levelId);
    // console.log(locationId);
    // console.log(productId);
    // const response = await fetchCreateBin(name,quantity,levelId,locationId,productId);
    // console.log(response);
    // // // console.log(response);
    // if(response === 200){
    //   setLoading(true);
    //   router.push("/dashboard/bin");
    // }
    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter the name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
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
                onChange={(e)=>setName(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div>

        {/* quantity */}
        <div className="mb-4">
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
        </div>


         {/*Choose Location Level id */}
         <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose the Location Level
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <select
                id="category"
                name="category_id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={levelId}
                onChange={(e)=> setLevelId(e.target.value)}
                required
                // defaultValue={categoryId}
              >
                <option value="" disabled>None</option>
                
                {levels?.map((level: any) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div>

          {/*Choose Location Level id */}
          <div className="mb-4">
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
        </div>

          {/*Choose Location Level id */}
          <div className="mb-4">
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
        </div>
   
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/bin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}  >{loading ? "Submitting" : "Create Bin"}</Button>
      </div>
    </form>
  );
}
