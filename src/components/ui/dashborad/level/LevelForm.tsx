"use client";
import { FullFlex } from '@/components/common/FlexContainer';
import ControlledTextField from '@/components/form/control/ControlledTextField';
import { Level } from '@/redux/classes/response';
import { useCreateLevelMutation, useUpdateLevelMutation } from '@/redux/feature/levelSlice';
import { useAppSelector } from '@/redux/store';
import { LevelFormInput, levelSchema } from '@/schema/level.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  handleClose: () => void;
}

const defaultValues: LevelFormInput = {
  name: ""
};

const extractDefaultValues = (level: Level | null): LevelFormInput => {
  if (!!level) {
    return {
      name: level.name
    }
  } else {
    return defaultValues;
  }
}

const LevelForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();

  const { selectedLevel } = useAppSelector(state => state.level);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValues(selectedLevel),
    resolver: zodResolver(levelSchema),
  });

  const [createLevel, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateLevelMutation();
  const [updateLevel, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateLevelMutation();

  const onSubmit: SubmitHandler<LevelFormInput> = async (data) => {
    try {
      if (!!selectedLevel) {
        await updateLevel({ id: selectedLevel._id, data: data })
      } else {
        await createLevel(data);
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
          {!!selectedLevel ? "Update Location Level" : "Create Location level"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField control={control} error={errors.name?.message || null} label="Level Name" name="name" />
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>
    </>
  )
}

export default LevelForm