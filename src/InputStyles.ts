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

export const menuSx = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-bg-input)",
      color: "var(--color-input)",
      border: "1px solid var(--color-border-input)",
      borderRadius: "8px",
      "& .MuiMenuItem-root": {
        "&:hover": {
          backgroundColor: "var(--color-card-hover)",
        },
        "&.Mui-selected": {
          backgroundColor: "var(--color-card-bg)",
          "&:hover": {
            backgroundColor: "var(--color-card-hover)",
          },
        },
      },
      "& .MuiCheckbox-root": {
        color: "var(--color-label-input)",
        "&.Mui-checked": {
          color: "var(--color-label-secondary-input)",
        },
      },
    },
  },
};

export const paginationSx = {
  "& .MuiPaginationItem-root": {
    color: "var(--color-text-primary)",
    borderColor: "var(--color-border)",
    backgroundColor: "transparent",
    transition: "all 0.2s ease-in-out",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "var(--color-card-hover-secondary)",
    borderColor: "var(--color-accent-blue)",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    color: "var(--color-btn-text-primary)",
    backgroundColor: "var(--color-btn-bg-primary)",
    borderColor: "var(--color-btn-bg-primary)",
  },
  "& .MuiPaginationItem-root.Mui-selected:hover": {
    backgroundColor: "var(--color-btn-hover-primary)",
  },
};
