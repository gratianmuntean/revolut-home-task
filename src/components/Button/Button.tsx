import React from "react";

import styles from "./styles.module.css";

type ButtonProps = {
  onClick?: any;
  children: React.ReactNode;
  className?: string;
  type?: any;
};

const Button = (props: ButtonProps) => {
  const { onClick, children, className, type } = props;
  return (
    <button
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
};

export default Button;
