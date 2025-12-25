import type { FC } from "react";
import s from "./NavButton.module.css";

type NavButtonProps = {
  text: string;
  onClick: () => void;
};

const NavButton: FC<NavButtonProps> = ({ text, onClick }) => {
  return (
    <button className={s.navButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default NavButton;
