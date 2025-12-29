export const inputSx = {
  "& .MuiInputBase-root": {
    backgroundColor: "var(--color-bg-input)",
    color: "var(--color-input)",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-label-input)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--color-label-secondary-input)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--color-border-input)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-label-secondary-input)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-label-secondary-input)",
    },
  },
};

export const datePickerSx = {
  InputLabelProps: {
    sx: {
      color: "var(--color-label-input)",
      "&.Mui-focused": {
        color: "var(--color-label-secondary-input)",
      },
    },
  },
  InputProps: {
    sx: {
      backgroundColor: "var(--color-bg-input)",
      color: "var(--color-input)",
      borderRadius: "8px",
      "& .MuiOutlinedInput": {
        borderColor: "var(--color-border-input) !important",
      },
      "&:hover .MuiOutlinedInput": {
        borderColor: "var(--color-label-secondary-input) !important",
      },
      "&.Mui-focused .MuiOutlinedInput": {
        borderColor: "var(--color-label-secondary-input) !important",
      },
      "& .MuiIconButton-root": {
        color: "var(--color-input)",
      },
    },
  },
};
