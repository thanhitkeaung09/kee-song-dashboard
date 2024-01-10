"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "@/components/form/control/ControlledTextField";
import ControlledSelect from "@/components/form/control/ControlledSelect";
import { useGetOptionsQuery } from "@/redux/feature/apiSlice";
import ControlledFilePicker from "@/components/form/control/ControlledFilePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomerFormInput, customerSchema } from "@/schema/customer.schema";
import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "@/redux/feature/customerSlice";
import { FullFlex } from "@/components/common/FlexContainer";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAppSelector } from "@/redux/store";
import { Customer } from "@/redux/classes/response";
import IDatePicker from "@/components/form/IDatePicker";

interface Props {
  handleClose: () => void;
}

const defaultValues: CustomerFormInput = {
  name: "",
  email: "",
  password: "",
  company: "",
  profile: null,
  address: "",
  dateOfBirth: new Date().toISOString(),
};

const extractDefaultValues = (customer: Customer | null): CustomerFormInput => {
  if (!!customer) {
    return {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      company: customer.company._id,
      dateOfBirth: customer.dateOfBirth,
      profile: customer.profile,
      password: customer.password,
    };
  } else {
    return defaultValues;
  }
};

const CustomerForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedCustomer } = useAppSelector((state) => state.customer);
  const { data, isLoading, isSuccess, isError } =
    useGetOptionsQuery("/company/option");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: extractDefaultValues(selectedCustomer),
    resolver: zodResolver(customerSchema),
  });

  const [
    createCustomer,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: createError,
    },
  ] = useCreateCustomerMutation();
  const [
    updateCustomer,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateCustomerMutation();

  const onSubmit: SubmitHandler<CustomerFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (!selectedCustomer) {
      formData.append("password", data.password);
    }
    formData.append("profile", data.profile);
    formData.append("company", data.company);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("address", data.address);
    try {
      if (!!selectedCustomer) {
        await updateCustomer({ id: selectedCustomer._id, data: formData });
      } else {
        await createCustomer(formData);
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
          Create Customer
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Typography variant="subtitle1">PERSONAL INFORMATION</Typography>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField
            control={control}
            error={errors.name?.message || null}
            label="Full Name"
            name="name"
          />
          <ControlledTextField
            control={control}
            error={errors.email?.message || null}
            label="E-mail"
            name="email"
          />
          {!selectedCustomer && (
            <ControlledTextField
              control={control}
              error={errors.password?.message || null}
              label="Password"
              name="password"
            />
          )}
          <ControlledSelect
            control={control}
            error={errors.company?.message || null}
            label="Company"
            name="company"
            options={isSuccess ? data.data : []}
          />
          <ControlledTextField
            control={control}
            error={errors.address?.message || null}
            label="Address"
            name="address"
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <IDatePicker
                  label="Date of Birth"
                  name="dateOfBirth"
                  onChange={onChange}
                  value={value}
                />
              );
            }}
          />
          {/* <ControlledFilePicker control={control} name="profile" /> */}
          <LoadingButton
            loading={createLoading}
            disabled={createLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ my: 1 }}
          >
            Save
          </LoadingButton>
        </form>
      </Box>
    </>
  );
};

export default CustomerForm;
