"use client";
import { useAppSelector } from "@/redux/store";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { FullFlex } from "./FlexContainer";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import ProfileHeading from "./ProfileHeading";

const drawerWidth = 240;

const AppBarLayout = () => {
  const { title } = useAppSelector((state) => state.app.appBar);
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white",
        }}
        elevation={0}
      >
        <FullFlex>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: theme.palette.primary.dark }}
            >
              {title}
            </Typography>
          </Toolbar>
          <FullFlex>
            <IconButton>
              <BellAlertIcon />
            </IconButton>
            <ProfileHeading />
          </FullFlex>
        </FullFlex>
      </AppBar>
    </>
  );
};

export default AppBarLayout;
