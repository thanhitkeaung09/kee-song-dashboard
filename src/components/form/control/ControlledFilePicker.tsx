import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import IFilePicker from '../IFilePicker'

type Props<T extends FieldValues> = {
  control: Control<T>,
  name: string,
}

const ControlledFilePicker: React.FC<Props<any>> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => {
        return <IFilePicker
          onFileChange={onChange}
          file={value}
        />
      }}
    />
  )
}

export default ControlledFilePicker