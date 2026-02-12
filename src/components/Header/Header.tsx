import type { FC } from "react";
import s from "./Header.module.css";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className={s.header}>
      <h2 className={s.headerTitle}>{title}</h2>
    </header>
  );
};

export default Header;
