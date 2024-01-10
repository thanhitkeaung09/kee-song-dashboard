import React, { useState } from "react";
import { FullFlex } from "./FlexContainer";
import { useGetMeQuery } from "@/redux/feature/apiSlice";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, KeyboardArrowDown, Logout, Settings } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { fetchLogout } from "@/lib/datas";
import { useRouter } from "next/navigation";
import IModal from "./IModal";

const ProfileHeading = () => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    const response = await fetchLogout();
    console.log(response);
    if (response?.status === 200) {
      localStorage.clear();
      router.push("/");
    }
  }

  const { data, isLoading, isSuccess, isError } = useGetMeQuery();
  let content = null;

  if (isLoading) {
    content = <>....</>;
  }

  if (isError) {
    content = <>Error loading profile</>;
  }

  if (isSuccess) {
    const { data: userData } = data;
    content = (
      <>
        <Avatar>{userData.username[0]}</Avatar>
        <Box>
          <Typography variant="h6" color="black">
            Hiiii,{userData.username}
          </Typography>
        </Box>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {/* Dashboard */}
            <IconButton>
              <KeyboardArrowDown />
            </IconButton>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem sx={{ fontSize: "15px" }} onClick={handleClose}>
              {userData.username}
            </MenuItem>
            <MenuItem onClick={handleClose}>{userData.email}</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setOpenConfirm(true)}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </>
    );
  }

  return (
    <FullFlex sx={{ width: "auto" }} gap={1}>
      {content}
      <IModal open={openConfirm} handleClose={() => setOpenConfirm(false)}>
        <FullFlex>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Confirm Log Out
          </Typography>
          <IconButton onClick={() => {
            setOpenConfirm(false)
            handleClose();
          }}>
            <Close />
          </IconButton>
        </FullFlex>
        <Typography>Are you sure you want to log out?</Typography>
        <FullFlex gap={1} sx={{ my: 2 }}>
          <Button onClick={() => {
            setOpenConfirm(false)
            handleClose();
          }} variant="contained" fullWidth size="large" color="secondary">
            No
          </Button>
          <Button onClick={() => {
            handleClose();
            logout();
          }} variant="contained" fullWidth size="large">
            Yes
          </Button>
        </FullFlex>
      </IModal>
    </FullFlex>
  );
};

export default ProfileHeading;
