import { TextField } from "@mui/material";
import { inputSx } from "../../InputStyles";
import type { FC } from "react";

type InputHomeProps = {
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  value: string;
  onChange: (e: string) => void;
  onBlur?: () => void;
  label: string;
  required?: boolean;
};

const CustomInput: FC<InputHomeProps> = ({
  error,
  helperText,
  value,
  onChange,
  onBlur,
  label = value,
  required,
}) => {
  return (
    <TextField
      required={required}
      error={error}
      helperText={helperText}
      fullWidth
      sx={inputSx}
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default CustomInput;
