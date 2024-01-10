"use client";
import { FullFlex } from "@/components/common/FlexContainer";
import IModal from "@/components/common/IModal";
import Loading from "@/components/common/Loading";
import WorkerForm from "@/components/ui/dashborad/worker/WorkerForm";
import WorkerTable from "@/components/ui/dashborad/worker/WorkerTable";
import { useChangeAppTitle } from "@/hooks/useChangeAppTitle";
import { setSelectedWorker, toggleFormDialog, useGetWorkersQuery } from "@/redux/feature/workerSlice";
import { useAppSelector } from "@/redux/store";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Card } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const WorkerPage = () => {
  useChangeAppTitle("Worker");
  const { data, isError, isLoading, isSuccess } = useGetWorkersQuery();
  const { openFormDialog } = useAppSelector((state) => state.worker);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedWorker(null))
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
    const { data: workerData } = data;
    content = (
      <>
        <WorkerTable workers={workerData} />
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
              Create Worker
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <WorkerForm handleClose={handleClose} />
      </IModal>
    </>
  );
};

export default WorkerPage;
