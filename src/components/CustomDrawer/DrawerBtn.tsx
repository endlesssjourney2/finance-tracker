import s from "./DrawerBtn.module.css";

import type { FC } from "react";
import type { MuiIcon } from "../../types/MuiIcon";

type DrawerBtnProps = {
  text: string;
  Icon: MuiIcon;
  onClick: () => void;
};

const DrawerBtn: FC<DrawerBtnProps> = ({ text, Icon, onClick }) => {
  return (
    <button className={s.drawerBtn} onClick={onClick}>
      <Icon />
      <span className={s.text}>{text}</span>
    </button>
  );
};

export default DrawerBtn;
