import React from "react";

import Button from "components/Button";

import revolutIcon from "assets/icons/revolutIcon.png";

import { accounts } from "./accounts";

import styles from "./styles.module.css";

const AMOUNT = 1000;

const LogoRow = () => (
  <div className={styles.logoRow}>
    <img src={revolutIcon} alt="sidebarIcon" />
    <div className={styles.logoText}>Revolut</div>
  </div>
);

const AvailableAccounts = () => (
  <div className={styles.accounts}>
    <div className={styles.accountsTitle}>
      <div>Available Accounts</div>
      <Button
        onClick={() => {
          console.warn("To be implemented");
        }}
      >
        + New
      </Button>
    </div>
    <article className={styles.flagsList}>
      {accounts?.map((acc, index) => {
        return (
          <div className={styles.accountRow}>
            {/* flag with text info */}
            <div className={styles.flagWithText}>
              <img src={acc?.flag} alt={acc?.currency} />
              <div className={styles.accountRowText}>
                <span className={styles.accountRowTextLabel}>{acc?.label}</span>
                <span className={styles.accountRowTextCurrency}>
                  {acc?.currency}
                </span>
              </div>
            </div>
            <div>{`${AMOUNT.toFixed(2)} ${acc?.symbol}`}</div>
          </div>
        );
      })}
    </article>
  </div>
);

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <LogoRow />
      <div className={styles.horizontalSeparator} />
      <AvailableAccounts />
    </div>
  );
};

export default Sidebar;
