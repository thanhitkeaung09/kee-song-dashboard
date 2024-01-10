import {
  AccountTree,
  FoodBankOutlined,
  GridViewOutlined,
  HomeWorkOutlined,
  PersonAddOutlined,
  PersonOutlineOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";
import React from "react";

export interface Route {
  title: string;
  path: string;
  icon: React.ReactNode | null;
  children: null | Array<Route>;
}

export const routes: Array<Route> = [
  // {
  //   title: "Org Chart",
  //   icon: <AccountTree />,
  //   path: "/dashboard/org-chart",
  //   children: null,
  // },
  {
    title: "User",
    icon: <PersonAddOutlined />,
    path: "/dashboard/user",
    children: null,
  },
  {
    title: "Worker",
    icon: <PersonAddOutlined />,
    path: "/dashboard/worker",
    children: null,
  },
  {
    title: "Department",
    icon: <PersonAddOutlined />,
    path: "/dashboard/department",
    children: null,
  },
  {
    title: "Company",
    icon: <HomeWorkOutlined />,
    path: "/dashboard/company",
    children: null,
  },
  {
    title: "Customer",
    icon: <PersonOutlineOutlined />,
    path: "/dashboard/customer",
    children: null,
  },
  {
    title: "Location Management",
    icon: <GridViewOutlined />,
    path: "/dashboard/location",
    children: null,
  },
  {
    title: "Bin Management",
    icon: <GridViewOutlined />,
    path: "/dashboard/bin",
    children: null,
  },
  {
    title: "Level Management",
    icon: <GridViewOutlined />,
    path: "/dashboard/level",
    children: null,
  },
  {
    title: "Products",
    icon: <FoodBankOutlined />,
    path: "/dashboard/products",
    children: null,
  },
  {
    title: "Categories",
    icon: <WidgetsOutlined />,
    path: "/dashboard/category",
    children: null,
  },
];
