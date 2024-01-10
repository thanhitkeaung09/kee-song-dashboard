'use client';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import { PowerIcon } from '@heroicons/react/24/outline';
import { fetchLogout } from '@/lib/datas';
import { useRouter } from 'next/navigation';
//for dialogue
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Backdrop, Typography } from '@mui/material';

export default function SideNav() {
    const router = useRouter()
    const [open,setOpen] = useState<boolean>(false);
    const [opening, setOpening] =useState<boolean>(false);


    const handleClickOpen = () => {
      setOpen(true);
      // setOpening(true);

    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleYes = async (e : any) => {
      e.preventDefault();
      setOpening(true);
      setOpen(true);


  const handleClose = () => {
    // setOpen(false);
  };
  const handleOpen = () => {
    setOpening(true);
  };
      // alert("This is Yes");
       const response = await fetchLogout();
      if(response?.status == 200){
        router.push("/");
      }
    }
    
    const handleSubmit = async (e : any) => {
      e.preventDefault();
      // const response = await fetchLogout();
      // if(response?.status == 200){
      //   router.push("/");
      // }
    }
  return (
    <div className="flex h-screen overflow-y-scroll flex-col ">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#EEF296] p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* <AcmeLogo /> */}
          <Image 
            src="/kee-song-logo.gif"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <div className="overflow-y-auto max-h-[calc(100vh-140px)]"> 
          <NavLinks />
        </div>
        
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action="" onSubmit={handleSubmit}>
          <button onClick={handleClickOpen} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Log Out</div>
          </button>


      {/* <Button variant="outlined" onClick={handleClickOpen}>
      <PowerIcon className="w-6" />

        Log Out
      </Button> */}
        <div className=''>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => 1500 }}
          open={opening}
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
          <Typography variant='h6' >Logging Out....</Typography>
          </div>
        </Backdrop>
    </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Want to Log Out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Logging out will end your current session. Are you sure you want to log out?
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
      
      </div>
    </div>
  );
}
