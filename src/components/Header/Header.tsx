import React from "react";

import constants from "config/constants";

import hamburger from "assets/icons/Hamburger.png";

import styles from "./styles.module.css";

const Header = (props: any) => {
  const { setMobileOpen } = props;
  return (
    <header className={styles.header}>
      <h1>{constants.EXCHANGE_PAGE}</h1>
      <div className={styles.hamburgerIcon} onClick={setMobileOpen}>
        <img src={hamburger} alt="hamburger" />
      </div>
    </header>
  );
};

export default Header;
