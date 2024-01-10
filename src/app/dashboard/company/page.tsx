"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import CompanyForm from '@/components/ui/dashborad/company/CompanyForm';
import CompanyTable from '@/components/ui/dashborad/company/CompanyTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedCompany, toggleFormDialog, useGetCompaniesQuery } from '@/redux/feature/companySlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Card } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const CompanyPage = () => {
  useChangeAppTitle("Company");
  const { data, isError, isLoading, isSuccess } = useGetCompaniesQuery();
  const { openFormDialog } = useAppSelector((state) => state.company);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedCompany(null));
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
    const { data: companyData } = data;
    content = (
      <>
        <CompanyTable companies={companyData} />
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
              Create Company
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <CompanyForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default CompanyPage