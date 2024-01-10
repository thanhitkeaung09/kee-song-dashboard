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
import { fetchAllLocationLevel, fetchCreateLocation, fetchOneLocationById, fetchUpdateLocation } from './datas';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const [locations,setLocation] = useState<any[]>([]);
  const [locationId,setLocationId] = useState<string>('');
  const [row,setRow] = useState<string>('');
  const [column,setColumn] = useState<string>('');
  const [loading,setLoading] = useState<boolean>(false);
  const [id, setId] = useState<any>('');


    useEffect(()=>{
        const fetchData = async () => {

        const url = new URL(window.location.href);
        const lastSegment = url.pathname.split('/').pop();
        // console.log(lastSegment);
        const response = await fetchOneLocationById(lastSegment);
        // console.log(response);
        const data = await fetchAllLocationLevel();
        // console.log(data);
        setLocation(data);
        if(response){
          setLocationId(response.location_level_id);
          setRow(response.row);
          setColumn(response.column);
            // setName(response.name);
            setId(lastSegment);
        }
        else{
            router.push("/dashboard/category");
        }
        // console.log(response);
        };
        fetchData();

    },[router])

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    const response = await fetchUpdateLocation(locationId,row,column,id);
    // console.log(response);
    if(response === 200){
      setLoading(true);
      router.push("/dashboard/location");
    }
    // console.log(`>>>>>>>>>>${locationId} >>>>>>>>>>>>>>${row} >>>>>>>>>>>>>${column}`);
    // alert("this is location create event");
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/*Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter the Location Level
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
                    {location.name}
                  </option>
                ))}
              </select>
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
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
                onChange={(e)=>setRow(e.target.value)}
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div>
        {/* Phone */}
        <div className="mb-4">
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
                onChange={(e)=>{setColumn(e.target.value)}}
              />
              <EllipsisHorizontalCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
         
          </div>
        </div>  
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/location"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={loading}  >{loading ? "Submitting" : "Update Location"}</Button>
      </div>
    </form>
  );
}
