import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { type FC } from "react";
import { inputSx, menuSx } from "../../InputStyles";
import { monthLabel } from "../../helpers/monthLabel";

type SearchSelectProps = {
  label: string;
  values: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
};

const SearchSelect: FC<SearchSelectProps> = ({
  label,
  values,
  selectedValues,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth sx={inputSx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) =>
          selected.map((v) => monthLabel(v, "MMMM YY")).join(", ")
        }
        MenuProps={menuSx}
      >
        {values.map((v) => (
          <MenuItem key={v} value={v}>
            <Checkbox checked={selectedValues.includes(v)} />
            <ListItemText primary={monthLabel(v, "MMMM YY")} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchSelect;
