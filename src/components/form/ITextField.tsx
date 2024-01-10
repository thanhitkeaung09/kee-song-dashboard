import { InputAdornment, TextField } from "@mui/material";
import React from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: "email" | "password" | "text" | "number";
  isRequired?: boolean;
  error?: null | string;
  startAdornment?: null | React.ReactNode;
  endAdornment?: null | React.ReactNode;
};

const ITextField = ({
  id,
  label,
  name,
  value,
  onChange,
  type = "text",
  isRequired = false,
  startAdornment = null,
  endAdornment = null,
  error = null,
}: Props) => {
  return (
    <TextField
      error={!!error}
      id={id}
      label={label}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      required={isRequired}
      variant="outlined"
      helperText={error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      sx={{ width: "100%", my: 1 }}
    />
  );
};

export default ITextField;
