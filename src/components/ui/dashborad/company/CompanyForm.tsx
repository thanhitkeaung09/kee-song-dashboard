"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import ControlledFilePicker from '@/components/form/control/ControlledFilePicker';
import ControlledTextField from '@/components/form/control/ControlledTextField';
import { Company } from '@/redux/classes/response';
import { useCreateCompanyMutation, useUpdateCompanyMutation } from '@/redux/feature/companySlice';
import { useAppSelector } from '@/redux/store';
import { CompanyFormInput, companySchema } from '@/schema/company.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  handleClose: () => void;
}

const defaultValues: CompanyFormInput = {
  name: "",
  size: "",
  logo: null,
}

const extractDefaultValues = (company: Company | null): CompanyFormInput => {
  if (!!company) {
    return {
      name: company.name,
      size: company.size,
      logo: company.logo
    }
  } else {
    return defaultValues
  }
}

const CompanyForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedCompany } = useAppSelector(state => state.company);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValues(selectedCompany),
    resolver: zodResolver(companySchema),
  });
  const [createCompany, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateCompanyMutation();
  const [updateCompany, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateCompanyMutation();

  const onSubmit: SubmitHandler<CompanyFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("size", data.size);
    if (typeof data.logo === "object") {
      formData.append("logo", data.logo);
    }
    try {
      if (!!selectedCompany) {
        await updateCompany({ id: selectedCompany._id, data: formData });
      } else {
        await createCompany(formData);
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
        <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
          {!!selectedCompany ? "Update Company" : "Create Company"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Typography variant="subtitle1">COMPANY INFORMATION</Typography>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField control={control} error={errors.name?.message || null} label="Company Name" name="name" />
          <ControlledTextField control={control} error={errors.size?.message || null} label="Company Size" name="size" />
          {/* <ControlledFilePicker control={control} name="logo" /> */}
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>

    </>
  )
}

export default CompanyForm