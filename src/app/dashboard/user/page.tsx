"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import UserForm from '@/components/ui/dashborad/user/UserForm';
import UserTable from '@/components/ui/dashborad/user/UserTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedUser, toggleFormDialog } from '@/redux/feature/userSlice';
import { useGetWorkersQuery } from '@/redux/feature/workerSlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Card } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const UserPage = () => {
  useChangeAppTitle("Worker");
  const { data, isError, isLoading, isSuccess } = useGetWorkersQuery();
  const { openFormDialog } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedUser(null))
    dispatch(toggleFormDialog(false));
  };

  let content = null;
  if (isLoading) {
    content = <Loading open={true} />;
  }
  if (isError) {
    content = <>Error loading workers</>;
  }
  if (isSuccess) {
    const { data: userData } = data;
    content = (
      <>
        <UserTable users={userData} />
      </>
    );
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <FullFlex sx={{ mb: 2 }} justifyContent="flex-end">
            <Button
              onClick={handleOpen}
              variant="contained"
              startIcon={<AddCircleOutline />}
            >
              Create User
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <UserForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default UserPage
