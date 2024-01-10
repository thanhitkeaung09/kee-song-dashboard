"use client";
import { routes } from "@/lib/routes";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import DrawerListItem from "./DrawerListItem";
const drawerWidth = 240;

const DrawerLayout = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route, index) => {
          return <DrawerListItem route={route} key={index} />;
        })}
      </List>
    </Drawer>
  );
};

export default DrawerLayout;
