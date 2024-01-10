"use client";
import { FullFlex } from "@/components/common/FlexContainer";
import IModal from "@/components/common/IModal";
import Loading from "@/components/common/Loading";
import ProductCategoryForm from "@/components/ui/dashborad/product-category/ProductCategoryForm";
import ProductCategoryTable from "@/components/ui/dashborad/product-category/ProductCategoryTable";
import { useChangeAppTitle } from "@/hooks/useChangeAppTitle";
import {
  setSelectedProductCategory,
  toggleFormDialog,
  useGetProductCategoriesQuery,
} from "@/redux/feature/productCategorySlice";
import { useAppSelector } from "@/redux/store";
import { AddCircleOutline, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const CategoryPage = () => {
  useChangeAppTitle("Product Category");
  const { data, isError, isLoading, isSuccess } =
    useGetProductCategoriesQuery();
  const { openFormDialog } = useAppSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleFormDialog(true));
  };

  const handleClose = () => {
    dispatch(setSelectedProductCategory(null));
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
    const { data: productCategoryData } = data;
    content = (
      <>
        <ProductCategoryTable
          productCategories={productCategoryData.categories}
        />
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
              Create Category
            </Button>
          </FullFlex>
          {content}
        </Card>
      </Box>
      <IModal open={openFormDialog} handleClose={handleClose}>
        <ProductCategoryForm handleClose={handleClose} />
      </IModal>
    </>
  );
};

export default CategoryPage;
