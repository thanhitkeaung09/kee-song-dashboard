"use client";
import ITextField from "@/components/form/ITextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const PasswordField: React.FC<Props> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <ITextField
      id="password"
      name="password"
      label="Password"
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      value={value}
      isRequired={true}
      endAdornment={
        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
    />
  );
};

export default PasswordField;
