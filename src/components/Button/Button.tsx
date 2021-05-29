import React from "react";

import styles from "./styles.module.css";

type ButtonProps = {
  onClick: any;
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  const { onClick, children } = props;
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
