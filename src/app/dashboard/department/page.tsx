"use client";
import { FullFlex } from "@/components/common/FlexContainer";
import IModal from "@/components/common/IModal";
import Loading from "@/components/common/Loading";
import DepartmentForm from "@/components/ui/dashborad/department/DepartmentForm";
import DepartmentTable from "@/components/ui/dashborad/department/DepartmentTable";
import WorkerForm from "@/components/ui/dashborad/worker/WorkerForm";
import WorkerTable from "@/components/ui/dashborad/worker/WorkerTable";
import { useChangeAppTitle } from "@/hooks/useChangeAppTitle";
import {
  setSelectedDepartment,
  useGetDepartmentQuery,
} from "@/redux/feature/departmentSlice";
import { toggleFormDialog } from "@/redux/feature/departmentSlice";
import { useAppSelector } from "@/redux/store";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Card } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const DepartmentPage = () => {
  useChangeAppTitle("Department");
  const { data, isError, isLoading, isSuccess } = useGetDepartmentQuery();
  console.log(data);
  const { openFormDialog } = useAppSelector((state) => state.department);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedDepartment(null));
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
        <DepartmentTable departments={workerData} />
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
              Create Department
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <DepartmentForm handleClose={handleClose} />
      </IModal>
    </>
  );
};

export default DepartmentPage;
