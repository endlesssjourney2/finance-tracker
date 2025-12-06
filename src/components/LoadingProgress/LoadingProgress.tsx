import { Backdrop, CircularProgress } from "@mui/material";
import type { FC } from "react";

type LoadingProgressProps = {
  loading: boolean;
};

const LoadingProgress: FC<LoadingProgressProps> = ({ loading }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingProgress;
