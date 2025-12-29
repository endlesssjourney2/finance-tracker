import type { FC } from "react";
import s from "./ThemeToggleButton.module.css";

type ThemeToggleButtonProps = {
  onClick: () => void;
};

const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({ onClick }) => {
  return (
    <button className={s.toggleBtn} onClick={onClick}>
      <span className={s.sun}>☀️</span>
      <span className={s.moon}>🌙</span>
    </button>
  );
};

export default ThemeToggleButton;
