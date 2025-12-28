import { Skeleton } from "@mui/material";
import s from "./SkeletonView.module.css";

const sxColor = { bgColor: "rgba(255, 255,255, 0.1" };

const SkeletonView = () => {
  return (
    <div className={s.content}>
      <ul className={s.expensesList}>
        {Array.from({ length: 8 }).map((_, i) => (
          <li className={s.expenseItem} key={i}>
            <Skeleton width="80%" height={30} sx={sxColor} />
            <Skeleton width="60%" height={25} sx={sxColor} />
            <Skeleton width="90%" height={20} sx={sxColor} />
            <Skeleton width="50%" height={20} sx={sxColor} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonView;
