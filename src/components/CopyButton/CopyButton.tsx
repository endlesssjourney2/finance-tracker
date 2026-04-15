import { useState, type FC } from "react";
import s from "./CopyButton.module.css";

type CopyButtonProps = {
  text: string;
  textForButton?: string;
};

const CopyButton: FC<CopyButtonProps> = ({ text, textForButton }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (e) {
      console.error("Failed to copy text: ", e);
    }
  };

  return (
    <button className={s.button} onClick={handleCopy} disabled={copied}>
      {copied ? "Copied!" : textForButton || "Copy"}
    </button>
  );
};

export default CopyButton;
