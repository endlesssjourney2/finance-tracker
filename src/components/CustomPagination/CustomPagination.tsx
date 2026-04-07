import type { FC } from "react";
import Pagination from "@mui/material/Pagination";
import s from "./Pagination.module.css";

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
      />
    </div>
  );
};

export default CustomPagination;
