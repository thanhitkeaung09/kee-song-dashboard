import { FullFlex } from '@/components/common/FlexContainer';
import ControlledSelect from '@/components/form/control/ControlledSelect';
import ControlledTextField from '@/components/form/control/ControlledTextField';
import { Bin } from '@/redux/classes/response';
import { useGetOptionsQuery } from '@/redux/feature/apiSlice';
import { useCreateBinMutation, useUpdateBinMutation } from '@/redux/feature/binSlice';
import { useAppSelector } from '@/redux/store';
import { BinFormInput, binShema } from '@/schema/bin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  handleClose: () => void;
}

const defaultValues: BinFormInput = {
  name: "",
  location_level: "",
};

const extractDefaultValues = (bin: Bin | null): BinFormInput => {
  if (!!bin) {
    return {
      name: bin.name,
      location_level: bin.location_level._id
    }
  } else {
    return defaultValues;
  }
}

const BinForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedBin } = useAppSelector(state => state.bin);
  const { data, isLoading, isSuccess, isError } = useGetOptionsQuery("/location_level/option");
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValues(selectedBin),
    resolver: zodResolver(binShema),
  });

  const [createBin, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateBinMutation();
  const [updateBin, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateBinMutation();

  const onSubmit: SubmitHandler<BinFormInput> = async (data) => {
    try {
      if (!!selectedBin) {
        await updateBin({ id: selectedBin._id, data: data })
      } else {
        await createBin(data);
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
          {!!selectedBin ? "Update Bin" : "Create Bin"}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledTextField control={control} error={errors.name?.message || null} label="Bin Name" name="name" />
          <ControlledSelect control={control} error={errors.location_level?.message || null} label="Location Level" name="location_level" options={isSuccess ? data.data : []} />
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>
    </>
  )
}

export default BinForm