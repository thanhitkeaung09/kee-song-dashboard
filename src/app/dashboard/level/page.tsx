"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import LevelForm from '@/components/ui/dashborad/level/LevelForm';
import LevelTable from '@/components/ui/dashborad/level/LevelTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedLevel, toggleFormDialog, useGetLevelsQuery } from '@/redux/feature/levelSlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const LevelPage = () => {
  useChangeAppTitle("Location Level");
  const { data, isError, isLoading, isSuccess } = useGetLevelsQuery();
  const { openFormDialog } = useAppSelector((state) => state.level);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedLevel(null));
    dispatch(toggleFormDialog(false));
  };

  let content = null;
  if (isLoading) {
    content = <Loading open={true} />;
  }
  if (isError) {
    content = <>Error loading Levels</>;
  }
  if (isSuccess) {
    const { data: levelData } = data;
    content = (
      <>
        <LevelTable levels={levelData.locationLevels} />
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
              Create Location Level
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <LevelForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default LevelPage