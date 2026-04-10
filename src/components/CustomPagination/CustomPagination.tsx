import type { FC } from "react";
import Pagination from "@mui/material/Pagination";
import s from "./CustomPagination.module.css";
import { paginationSx } from "../../InputStyles";

type PaginationColor = "primary" | "secondary" | "standard";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (page: number) => void;
  color?: PaginationColor;
};

const CustomPagination: FC<PaginationProps> = ({
  count,
  page,
  onChange,
  color = "primary",
}) => {
  return (
    <div className={s.paginationContainer}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, page) => onChange(page)}
        color={color}
        sx={paginationSx}
      />
    </div>
  );
};

export default CustomPagination;
