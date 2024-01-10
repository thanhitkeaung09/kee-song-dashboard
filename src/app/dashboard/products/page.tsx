"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import IModal from '@/components/common/IModal';
import Loading from '@/components/common/Loading';
import ProductForm from '@/components/ui/dashborad/product/ProductForm';
import ProductTable from '@/components/ui/dashborad/product/ProductTable';
import { useChangeAppTitle } from '@/hooks/useChangeAppTitle';
import { setSelectedProduct, toggleFormDialog, useGetProductsQuery } from '@/redux/feature/productSlice';
import { useAppSelector } from '@/redux/store';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const ProductPage = () => {
  useChangeAppTitle("Products");
  const { data, isError, isLoading, isSuccess } = useGetProductsQuery();
  const { openFormDialog } = useAppSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedProduct(null));
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
    const { data: productData } = data;
    content = (
      <>
        <ProductTable products={productData.products} />
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
              Create Product
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <ProductForm handleClose={handleClose} />
      </IModal>
    </>
  )
}

export default ProductPage