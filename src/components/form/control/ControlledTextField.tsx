import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';
import ITextField from '../ITextField';

type Props<T extends FieldValues> = {
  control: Control<T>,
  name: string,
  error: string | null,
  label: string
}

const ControlledTextField = ({ control, name, error = null, label }: Props<any>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <ITextField
            id={name}
            label={label}
            {...field}
            error={error}
            isRequired={true}
          />
        );
      }}
    />
  )
}

export default ControlledTextField