import React from "react";

import constants from "config/constants";

import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>{constants.EXCHANGE_PAGE}</h1>
    </header>
  );
};

export default Header;
