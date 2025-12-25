import { Skeleton } from "@mui/material";
import s from "./SkeletonHome.module.css";

const sxColor = { bgColor: "rgba(255, 255,255, 0.1" };

const ExpensesSkeleton = () => {
  return (
    <div className={s.expenses}>
      <Skeleton width={260} height={32} sx={sxColor} />
      <ul className={s.expensesList}>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className={s.expenseItem}>
            <Skeleton width={120} height={20} sx={sxColor} />
            <Skeleton width={120} height={20} sx={sxColor} />
            <Skeleton width={120} height={20} sx={sxColor} />
            <Skeleton width={120} height={20} sx={sxColor} />
            <Skeleton
              variant="rectangular"
              height={36}
              width={100}
              sx={sxColor}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesSkeleton;
