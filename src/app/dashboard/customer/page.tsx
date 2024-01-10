"use client";
import { FullFlex } from "@/components/common/FlexContainer";
import IModal from "@/components/common/IModal";
import Loading from "@/components/common/Loading";
import CustomerForm from "@/components/ui/dashborad/customer/CustomerForm";
import CustomerTable from "@/components/ui/dashborad/customer/CustomerTable";
import { useChangeAppTitle } from "@/hooks/useChangeAppTitle";
import { setSelectedCustomer, toggleFormDialog, useGetCustomerQuery } from "@/redux/feature/customerSlice";

import { useAppSelector } from "@/redux/store";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Card } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const CustomerPage = () => {
  useChangeAppTitle("Customer");
  const { data, isError, isLoading, isSuccess } = useGetCustomerQuery();
  const { openFormDialog } = useAppSelector((state) => state.customer);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedCustomer(null));
    dispatch(toggleFormDialog(false));
  };

  let content = null;
  if (isLoading) {
    content = <Loading open={true} />;
  }
  if (isError) {
    content = <>Error loading Customer.</>;
  }
  if (isSuccess) {
    // console.log(data.data.customers);
    const { data: customerData } = data;
    content = (
      <>
        <CustomerTable customer={customerData} />
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
              Create Customer
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <CustomerForm handleClose={handleClose} />
      </IModal>
    </>
  );
};

export default CustomerPage;
