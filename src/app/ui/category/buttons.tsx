import { fetchDeleteCategory, fetchOneCategoryById } from "@/lib/datas";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export function CreateCategory() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    // setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="">
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
        href="/dashboard/category/create"
        className="flex  h-10 items-center rounded-lg bg-[#9ADE7B] px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Category</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </div>
  );
}

export function UpdateCategory({ id }: { id: string }) {
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
        href={`/dashboard/category/edit/${id}`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const fetchSingle = async () => {
    const response = await fetchOneCategoryById(id);
    setName(response.name);
    // console.log(response);
  };
  fetchSingle();

  const handleDelete = async (e: any) => {
    // e.preventDefault();
    const response = await fetchDeleteCategory(id);
    if (response) {
      router.push("/dashboard/category");
    }
    // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>${id}`);
  };
  // const deleteInvoiceWithId = deleteInvoice.bind(null,id);
  const handleClickOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    handleDelete(id);
    window.location.reload();
    // alert("This is Yes");
    //  const response = await fetchLogout();
    // if(response?.status == 200){
    //   router.push("/");
    // }
  };
  return (
    <form action="">
      <button
        onClick={handleClickOpen}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Want to Delete?"}
          <span className="font-bold ps-3">{name}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
