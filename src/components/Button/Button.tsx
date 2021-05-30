import React from "react";

import styles from "./styles.module.css";

type ButtonProps = {
  onClick?: any;
  children: React.ReactNode;
  className?: string;
  type?: any;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { onClick, children, className, type, disabled } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
};

export default Button;
