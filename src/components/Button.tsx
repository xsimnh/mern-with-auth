import React, { useMemo } from "react";
import "./Button.less";

export interface ButtonProps {
  className?: string;
  theme?: boolean;
  icon?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ icon, text, theme, className, onClick }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  let classnames = useMemo(() => {
    let c = "c-button";
    if (className) {
      c += " " + className;
    }
    if (theme) {
      c += " c-button-theme";
    }
    if (icon) {
      c += " c-button-icon " + icon;
    }
    return c;
  }, [className, icon, theme]);

  return (
    <button className={classnames} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
