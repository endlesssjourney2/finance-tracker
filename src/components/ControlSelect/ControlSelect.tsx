import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { inputSx } from "../../InputStyles";
import type { FC } from "react";

type ControlSelectProps = {
  value: string;
  disabledValue?: string;
  onChange: (e: string) => void;
  values: string[];
  label: string;
  formatValue?: (v: string) => string;
};

const ControlSelect: FC<ControlSelectProps> = ({
  value,
  disabledValue,
  onChange,
  values,
  label,
  formatValue,
}) => {
  const format = formatValue ?? ((v) => v);

  return (
    <FormControl fullWidth sx={inputSx}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((v) => (
          <MenuItem key={v} value={v} disabled={v === disabledValue}>
            {format(v)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ControlSelect;
