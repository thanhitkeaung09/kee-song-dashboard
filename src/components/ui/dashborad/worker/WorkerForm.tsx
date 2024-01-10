"use client";
import { WorkerFormInput, workerSchema } from "@/schema/worker.schema";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "@/components/form/control/ControlledTextField";
import ControlledSelect from "@/components/form/control/ControlledSelect";
import { useGetOptionsQuery } from "@/redux/feature/apiSlice";
import ControlledFilePicker from "@/components/form/control/ControlledFilePicker";
import {
  useCreateWorkerMutation,
  useUpdateWorkerMutation,
} from "@/redux/feature/workerSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { FullFlex } from "@/components/common/FlexContainer";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAppSelector } from "@/redux/store";
import { Worker } from "@/redux/classes/response";

interface Props {
  handleClose: () => void;
}

const defaultValues: WorkerFormInput = {
  username: "",
  email: "",
  password: "",
  user_level: "",
  profile: null,
};

const extractDefaultValues = (worker: Worker | null): WorkerFormInput => {
  if (!!worker) {
    return {
      username: worker.username,
      email: worker.email,
      password: worker.password,
      user_level: worker.user_level._id,
      profile: worker.profile === "null" ? null : worker.profile,
    };
  } else {
    return defaultValues;
  }
};

const WorkerForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedWorker } = useAppSelector((state) => state.worker);

  const { data, isLoading, isSuccess, isError } =
    useGetOptionsQuery("/user_level/option");
  console.log(data);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: extractDefaultValues(selectedWorker),
    resolver: zodResolver(workerSchema),
  });

  useEffect(() => {
    if (isSuccess && data && data.data.length > 0) {
      const defaultUserLevel = data.data.find(
        (item: any) => item.label === "Worker"
      );
      if (defaultUserLevel) {
        setValue("user_level", defaultUserLevel.value);
      }
    }
  }, [isSuccess, data, setValue]);

  const [
    createWorker,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: createError,
    },
  ] = useCreateWorkerMutation();
  const [
    updateWorker,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateWorkerMutation();

  const onSubmit: SubmitHandler<WorkerFormInput> = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    if (!selectedWorker) {
      formData.append("password", data.password);
    }
    formData.append("profile", data.profile);
    formData.append("user_level", data.user_level);
    console.log(formData.get("user_level"));

    try {
      if (!!selectedWorker) {
        await updateWorker({ id: selectedWorker._id, data: formData });
      } else {
        await createWorker(formData);
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
          {!!selectedWorker ? "Update Worker" : "Create Worker"}
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
            error={errors.username?.message || null}
            label="Full Name"
            name="username"
          />
          <ControlledTextField
            control={control}
            error={errors.email?.message || null}
            label="E-mail"
            name="email"
          />
          {!selectedWorker && (
            <ControlledTextField
              control={control}
              error={errors.password?.message || null}
              label="Password"
              name="password"
            />
          )}
          {/* <ControlledSelect
            control={control}
            error={errors.user_level?.message || null}
            label="User Level"
            name="user_level"
            options={isSuccess ? data.data : []}
          /> */}
          {/* <ControlledFilePicker control={control} name="profile" /> */}
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

export default WorkerForm;
