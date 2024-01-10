import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import ISelect from '../ISelect'
import { IOptions } from '@/redux/classes/response'

type Props<T extends FieldValues> = {
  control: Control<T>,
  name: string,
  error: string | null,
  label: string,
  options: Array<IOptions>
}

const ControlledSelect = ({ control, name, error = null, label, options }: Props<any>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <ISelect
          {...field}
          id={name}
          label={label}
          options={options}
          error={error}
          isRequired={true}
        />
      }} />
  )
}

export default ControlledSelect