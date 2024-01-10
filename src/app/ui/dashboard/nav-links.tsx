"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserPlusIcon,
  UserCircleIcon,
  Bars2Icon,
  GlobeAltIcon,
  ClipboardDocumentIcon,
  BuildingOfficeIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { Typography } from "@mui/material";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "User", href: "/dashboard/user", icon: UserPlusIcon },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: DocumentDuplicateIcon,
  },
  { name: "Category", href: "/dashboard/category", icon: Bars2Icon },
  {
    name: "Location Level",
    href: "/dashboard/level",
    icon: AdjustmentsHorizontalIcon,
  },
  { name: "Location", href: "/dashboard/location", icon: GlobeAltIcon },
  // { name: 'Bin', href: '/dashboard/bin', icon: ClipboardDocumentIcon  },
  { name: "Company", href: "/dashboard/company", icon: BuildingOfficeIcon },
  { name: "Customer", href: "/dashboard/customer", icon: UserIcon },
  // { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
];

export default function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // console.log(router.refresh());
    setOpen(false);
  }, [pathname, router]);

  const handleClose = () => {
    // setOpen(false);
    // console.log(pathname);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // console.log(pathname);
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

      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            onClick={handleOpen}
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
