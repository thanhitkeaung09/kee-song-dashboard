"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import BinForm from '@/components/ui/dashborad/bin/BinForm';
import BinTable from '@/components/ui/dashborad/bin/BinTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedBin, toggleFormDialog, useGetBinsQuery } from '@/redux/feature/binSlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const BinPage = () => {

  useChangeAppTitle("Bin");
  const { data, isError, isLoading, isSuccess } = useGetBinsQuery();
  const { openFormDialog } = useAppSelector((state) => state.bin);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedBin(null));
    dispatch(toggleFormDialog(false));
  };

  let content = null;
  if (isLoading) {
    content = <Loading open={true} />;
  }
  if (isError) {
    content = <>Error loading Bins</>;
  }
  if (isSuccess) {
    const { data: binData } = data;
    content = (
      <>
        <BinTable bins={binData.bins} />
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
              Create Bin
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <BinForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default BinPage