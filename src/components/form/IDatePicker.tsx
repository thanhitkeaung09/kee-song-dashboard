import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  name: string;
  label: string;
  value: string; // ISO Format
  onChange: (v: string) => void;
};

const IDatePicker: React.FC<Props> = ({ name, label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ my: 1 }}>
        <DatePicker
          value={dayjs(value)}
          name={name}
          label={label}
          onChange={(value) => {
            const v = value?.toISOString();
            if (!!v) {
              onChange(v);
            }
          }}
          sx={{ width: "100%" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default IDatePicker;
