import type { FC } from "react";
import s from "./LinkButton.module.css";

type LinkButtonProps = {
  text: string;
  onClick: () => void;
};

const LinkButton: FC<LinkButtonProps> = ({ text, onClick }) => {
  return (
    <button className={s.linkButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default LinkButton;
