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
};

const InputHome: FC<InputHomeProps> = ({
  error,
  helperText,
  value,
  onChange,
  onBlur,
  label = "Label",
}) => {
  return (
    <TextField
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

export default InputHome;
