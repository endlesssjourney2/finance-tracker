import s from "./DrawerBtn.module.css";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { FC } from "react";

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

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
