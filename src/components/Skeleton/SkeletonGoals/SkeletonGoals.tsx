import s from "./SkeletonGoals.module.css";
import { Skeleton } from "@mui/material";

const sxColor = { bgColor: "rgba(255, 255,255, 0.1" };

const SkeletonGoals = () => {
  return (
    <div className={s.goals}>
      <div className={s.inputs}>
        <Skeleton width={750} height={75} sx={sxColor} />
        <Skeleton width={750} height={75} sx={sxColor} />
        <Skeleton width={750} height={75} sx={sxColor} />
      </div>
      <ul className={s.goalsList}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li className={s.item} key={i}>
            <div className={s.itemTop}>
              <Skeleton width={70} height={25} sx={sxColor} />
              <Skeleton width={70} height={25} sx={sxColor} />
            </div>
            <Skeleton width="95%" height={30} sx={sxColor} />
            <Skeleton width="20%" height={20} sx={sxColor} />
            <div className={s.buttons}>
              <Skeleton width={100} height={50} sx={sxColor} />
              <Skeleton width={100} height={50} sx={sxColor} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonGoals;
