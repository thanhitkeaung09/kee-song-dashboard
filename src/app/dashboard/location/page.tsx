"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import LocationForm from '@/components/ui/dashborad/location/LocationForm';
import LocationTable from '@/components/ui/dashborad/location/LocationTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedLocation, toggleFormDialog, useGetLocationsQuery } from '@/redux/feature/locationSlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const LocationPage = () => {
  useChangeAppTitle("Location");
  const { data, isError, isLoading, isSuccess } = useGetLocationsQuery();
  const { openFormDialog } = useAppSelector((state) => state.location);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedLocation(null));
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
    const { data: locationData } = data;
    content = (
      <>
        <LocationTable locations={locationData.locations} />
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
              Create Location
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <LocationForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default LocationPage