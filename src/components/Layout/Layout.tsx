import React, { useState } from "react";

import Sidebar from "components/Sidebar";
import Header from "components/Header";
import Exchange from "pages/Exchange";

import styles from "./styles.module.css";

type LayoutProps = {
  accounts: any;
  setAccounts: any;
};

const Layout = (props: LayoutProps) => {
  const { accounts, setAccounts } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className={styles.container}>
      <Sidebar accounts={accounts} mobileOpen={mobileOpen} />
      <div className={styles.verticalSeparator} />
      <main className={styles.main}>
        <Header setMobileOpen={() => setMobileOpen(!mobileOpen)} />
        <div className={styles.horizontalSeparator} />
        <Exchange accounts={accounts} setAccounts={setAccounts} />
      </main>
    </section>
  );
};

export default Layout;
