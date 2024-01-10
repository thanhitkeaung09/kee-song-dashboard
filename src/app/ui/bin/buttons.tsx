import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { fetchDeleteBin } from "./datas";
import { useState } from "react";
import { Backdrop, Typography } from "@mui/material";
import Image from "next/image";
// import { fetchDeleteCustomer } from './datas';
// import { fetchDeleteCompany } from './datas';
// import { fetchDeleteLocation } from './datas';

export function CreateBin() {
  return (
    <Link
      href="/dashboard/bin/create"
      className="flex h-10 items-center rounded-lg bg-[#9ADE7B] px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Bin</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBin({ id }: { id: any }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    // setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
          <div className="flex flex-col items-center justify-center">
            <Image
              width={150}
              height={150}
              src="/kee-song-logo.gif"
              alt="Profile"
              className=""
            />
            <Typography variant="h6">Loading....</Typography>
          </div>
        </Backdrop>
      </div>
      <Link
        onClick={handleOpen}
        href={`/dashboard/bin/edit/${id}`}
        className="flex h-10 items-center rounded-lg bg-[#9ADE7B] px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Bin</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
        {/* <PencilIcon className="w-5" /> */}
      </Link>
    </>
  );
}

export function DeleteBin({ id }: { id: string }) {
  const handleSubmit = (e: any) => {
    // e.preventDefault();
    fetchDeleteBin(id);
    // console.log(response);
    // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>${id}`);
  };
  // const deleteInvoiceWithId = deleteInvoice.bind(null,id);
  return (
    <form action="" onSubmit={handleSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
