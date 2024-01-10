"use client";
import { Route } from "@/lib/routes";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FullFlex } from "./FlexContainer";

type Props = {
  route: Route;
};

const DrawerListItem: React.FC<Props> = ({ route }) => {
  const pathname = usePathname();
  const isActive = pathname === route.path;
  return (
    <Link href={route.path}>
      <ListItem>
        <ListItemButton
          selected={isActive}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#43A047",
              color: "#FFF",
              ":hover": {
                backgroundColor: "#F0F7F0",
                color: "#000"
              }
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#43A047"
            },
            ":hover": {
              backgroundColor: "#F0F7F0",
              color: "#000"
            },
            borderRadius: 2
          }}
        >
          <FullFlex gap={2}>
            {route.icon}
            <ListItemText primary={route.title} />
          </FullFlex>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DrawerListItem;
