"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "@/components/form/control/ControlledTextField";
import ControlledSelect from "@/components/form/control/ControlledSelect";
import { useGetOptionsQuery } from "@/redux/feature/apiSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { ProductFormInput, productSchema } from "@/schema/product.schema";
import { useCreateProductMutation, useUpdateProductMutation } from "@/redux/feature/productSlice";
import { useAppSelector } from "@/redux/store";
import { Product } from "@/redux/classes/response";
import { FullFlex } from "@/components/common/FlexContainer";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

interface Props {
  handleClose: () => void;
}

const defaultValues: ProductFormInput = {
  name: "",
  category: "",
  sku: "",
};

const extractDefaultValues = (product: Product | null): ProductFormInput => {
  if (!!product) {
    return {
      name: product.name,
      category: product.category._id,
      sku: product.sku
    }
  } else {
    return defaultValues;
  }
}

const ProductForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();

  const { data, isLoading, isSuccess, isError } = useGetOptionsQuery("/category/option");
  const { selectedProduct } = useAppSelector(state => state.product);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValues(selectedProduct),
    resolver: zodResolver(productSchema),
  });

  const [createProduct, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateProductMutation();

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    try {
      if (!!selectedProduct) {
        await updateProduct({
          id: selectedProduct._id,
          data: data
        })
      } else {
        await createProduct(data);
      }
    } catch (error) {
      // Catch error
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <FullFlex>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          {!!selectedProduct ? "Update Product" : "Create Product"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField control={control} error={errors.name?.message || null} label="Product Name" name="name" />
          <ControlledTextField control={control} error={errors.sku?.message || null} label="Product SKU" name="sku" />
          <ControlledSelect control={control} error={errors.category?.message || null} label="Category" name="category" options={isSuccess ? data.data : []} />
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>
    </>
  );
};

export default ProductForm;
