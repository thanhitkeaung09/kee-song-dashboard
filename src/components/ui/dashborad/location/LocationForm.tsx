import { FullFlex } from '@/components/common/FlexContainer';
import ControlledSelect from '@/components/form/control/ControlledSelect';
import ControlledTextField from '@/components/form/control/ControlledTextField';
import { Location } from '@/redux/classes/response';
import { useGetOptionsQuery } from '@/redux/feature/apiSlice';
import { useCreateLocationMutation, useUpdateLocationMutation } from '@/redux/feature/locationSlice';
import { useAppSelector } from '@/redux/store';
import { LocationFormInput, locationSchema } from '@/schema/location.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  handleClose: () => void;
}

const defaultValues: LocationFormInput = {
  bin: "",
  column: "",
  row: ""
};

const extractDefaultValues = (location: Location | null): LocationFormInput => {
  if (!!location) {
    return {
      bin: location.bin._id,
      column: String(location.column),
      row: String(location.row)
    }
  } else {
    return defaultValues;
  }
}

const LocationForm: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();
  const { selectedLocation } = useAppSelector(state => state.location);
  const { data, isLoading, isSuccess, isError } = useGetOptionsQuery("/bin/option");
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: extractDefaultValues(selectedLocation),
    resolver: zodResolver(locationSchema),
  });

  const [createLocation, { isLoading: createLoading, isSuccess: createSuccess, isError: createError }] = useCreateLocationMutation();
  const [updateLocation, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError }] = useUpdateLocationMutation();

  const onSubmit: SubmitHandler<LocationFormInput> = async (data) => {
    try {
      if (!!selectedLocation) {
        await updateLocation({ id: selectedLocation._id, data: { ...data, column: Number(data.column), row: Number(data.row) } })
      } else {
        await createLocation({ ...data, column: Number(data.column), row: Number(data.row) });
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
          Create Location
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </FullFlex>
      <Typography variant="subtitle1">LOCATION INFORMATION</Typography>
      <Box sx={{ my: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ControlledSelect control={control} error={errors.bin?.message || null} label="Bin" name="bin" options={isSuccess ? data.data : []} />
          <ControlledTextField control={control} error={errors.row?.message || null} label="Row No." name="row" />
          <ControlledTextField control={control} error={errors.column?.message || null} label="Column No." name="column" />
          <LoadingButton loading={createLoading || updateLoading} disabled={createLoading || updateLoading} type="submit" variant="contained" fullWidth size="large" sx={{ my: 1 }}>
            Save
          </LoadingButton>
        </form>
      </Box>

    </>
  )
}

export default LocationForm