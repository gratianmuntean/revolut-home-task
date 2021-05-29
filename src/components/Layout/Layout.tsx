import React from "react";

import Sidebar from "components/Sidebar";
import Header from "components/Header";
import Exchange from "pages/Exchange";

import styles from "./styles.module.css";

const Layout = () => {
  return (
    <section className={styles.container}>
      <Sidebar />
      <div className={styles.verticalSeparator} />
      <main className={styles.main}>
        <Header />
        <div className={styles.horizontalSeparator} />
        <Exchange />
      </main>
    </section>
  );
};

export default Layout;
