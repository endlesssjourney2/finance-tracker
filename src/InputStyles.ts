export const inputSx = {
  "& .MuiInputBase-root": {
    backgroundColor: "#1E293B",
    color: "#F1F5F9",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#38BDF8",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#334155",
    },
    "&:hover fieldset": {
      borderColor: "#38BDF8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#38BDF8",
    },
  },
};

export const datePickerSx = {
  InputLabelProps: {
    sx: {
      color: "#94A3B8",
      "&.Mui-focused": {
        color: "#38BDF8",
      },
    },
  },
  InputProps: {
    sx: {
      backgroundColor: "#1E293B",
      color: "#F1F5F9",
      borderRadius: "8px",
      "& .MuiOutlinedInput": {
        borderColor: "#334155 !important",
      },
      "&:hover .MuiOutlinedInput": {
        borderColor: "#38BDF8 !important",
      },
      "&.Mui-focused .MuiOutlinedInput": {
        borderColor: "#38BDF8 !important",
      },
      "& .MuiIconButton-root": {
        color: "#F1F5F9",
      },
    },
  },
};
