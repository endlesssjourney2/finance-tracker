import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { inputSx } from "../../InputStyles";
import type { FC } from "react";
import { monthLabel } from "../../helpers/percentileTicks";

type MonthSelectProps = {
  value: string;
  disabledMonth?: string;
  onChange: (e: string) => void;
  months: string[];
  label: string;
};

const MonthSelect: FC<MonthSelectProps> = ({
  value,
  disabledMonth,
  onChange,
  months,
  label,
}) => {
  return (
    <FormControl fullWidth sx={inputSx}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {months.map((m) => (
          <MenuItem key={m} value={m} disabled={m === disabledMonth}>
            {monthLabel(m)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelect;
