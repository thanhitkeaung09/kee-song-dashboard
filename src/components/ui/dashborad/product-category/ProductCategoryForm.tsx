import { FullFlex } from '@/components/common/FlexContainer';
import ControlledTextField from '@/components/form/control/ControlledTextField';
import { ProductCategory } from '@/redux/classes/response';
import { useCreateProductCategoryMutation, useUpdateProductCategoryMutation } from '@/redux/feature/productCategorySlice';
import { useAppSelector } from '@/redux/store';
import { ProductCategoryFormInput, productCategorySchema } from '@/schema/product-category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  handleClose: () => void;
}

const defaultValues: ProductCategoryFormInput = {
  name: ""
};

const extractDefaultValue = (category: ProductCategory | null): ProductCategoryFormInput => {
  if (!!category) {
    return {
      name: category.name
    }
  } else {
    return defaultValues
  }
}

const ProductCategoryForm: React.FC<Props> = ({ handleClose }) => {

  const theme = useTheme();

  const { selectedProductCategory } = useAppSelector(state => state.category);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValue(selectedProductCategory),
    resolver: zodResolver(productCategorySchema),
  });

  const [createProductCategory, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateProductCategoryMutation();
  const [updateProductCategory, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateProductCategoryMutation();

  const onSubmit: SubmitHandler<ProductCategoryFormInput> = async (data) => {
    try {
      if (!!selectedProductCategory) {
        await updateProductCategory({ id: selectedProductCategory._id, data: data });
      } else {
        await createProductCategory(data);
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
          {!!selectedProductCategory ? "Update Product Category" : "Create Product Category"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField control={control} error={errors.name?.message || null} label="Category Name" name="name" />
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>

    </>
  )
}

export default ProductCategoryForm