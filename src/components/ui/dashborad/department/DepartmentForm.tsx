"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "@/components/form/control/ControlledTextField";
import { useGetOptionsQuery } from "@/redux/feature/apiSlice";

import LoadingButton from "@mui/lab/LoadingButton";
import { FullFlex } from "@/components/common/FlexContainer";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAppSelector } from "@/redux/store";
import { Department } from "@/redux/classes/response";
import { DepartmentFormInput, departmentSchema } from "@/schema/department.schema";
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from "@/redux/feature/departmentSlice";

interface Props {
  handleClose: () => void;
}

const defaultValues: DepartmentFormInput = {
  name: "",
};

const extractDefaultValues = (
  department: Department | null
): DepartmentFormInput => {
  if (!!department) {
    return {
      name: department.name,
    };
  } else {
    return defaultValues;
  }
};

const DepartmentForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedDepartment } = useAppSelector((state) => state.department);
  console.log(selectedDepartment);
  const { data, isLoading, isSuccess, isError } =
    useGetOptionsQuery("/user_level/option");
  console.log(data);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: extractDefaultValues(selectedDepartment),
    resolver: zodResolver(departmentSchema),
  });

  const [
    createDepartment,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: createError,
    },
  ] = useCreateDepartmentMutation();
  const [
    updateDepartment,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateDepartmentMutation();

  const onSubmit: SubmitHandler<DepartmentFormInput> = async (data) => {
    try {
      if (!!selectedDepartment) {
        await updateDepartment({ id: selectedDepartment._id, data });
      } else {
        await createDepartment(data);
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
          {!!selectedDepartment ? "Update Department" : "Create Department"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Typography variant="subtitle1">DEPARTMENT INFORMATION</Typography>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField
            control={control}
            error={errors.name?.message || null}
            label="Department Name"
            name="name"
          />

          <LoadingButton
            loading={createLoading || updateLoading}
            disabled={createLoading || updateLoading}
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

export default DepartmentForm;
