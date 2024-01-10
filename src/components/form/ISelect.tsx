import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

type Props = {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
  options: { label: string; value: string }[];
  error?: string | null;
  isRequired?: boolean;
  startAdornment?: null | React.ReactNode;
  endAdornment?: null | React.ReactNode;
};

const ISelect: React.FC<Props> = ({
  id,
  name,
  value,
  label,
  onChange,
  options = [],
  error = null,
  isRequired = false,
  startAdornment = null,
  endAdornment = null,
}) => {
  return (
    <>
      <FormControl fullWidth error={!!error}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          id={id}
          value={value}
          label={label}
          name={name}
          onChange={onChange}
          required={isRequired}
        >
          {options.map((option, index) => {
            return (
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormHelperText>{error}</FormHelperText>
    </>
  );
};

export default ISelect;
