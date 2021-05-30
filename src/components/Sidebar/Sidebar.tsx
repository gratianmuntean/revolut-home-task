import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "components/Button";

import revolutIcon from "assets/icons/revolutIcon.png";

import styles from "./styles.module.css";

import constants from "config/constants";

type SidebarProps = {
  accounts: any;
  mobileOpen: boolean;
};

const LogoRow = () => (
  <div className={styles.logoRow}>
    <img src={revolutIcon} alt="sidebarIcon" />
    <div className={styles.logoText}>{constants.REVOLUT}</div>
  </div>
);

const AvailableAccounts = (props: any) => {
  const { accounts } = props;

  return (
    <div className={styles.accounts}>
      <div className={styles.accountsTitle}>
        <div>{constants.AVAILABLE_ACCOUNTS}</div>
        <Button
          onClick={() => {
            console.warn("To be implemented");
          }}
        >
          {constants.NEW}
        </Button>
      </div>
      <article className={styles.flagsList}>
        {accounts?.map((acc: any, index: number) => {
          return (
            <div key={index} className={styles.accountRow}>
              {/* flag with text info */}
              <div className={styles.flagWithText}>
                <img src={acc?.flag} alt={acc?.currency} />
                <div className={styles.accountRowText}>
                  <span className={styles.accountRowTextLabel}>
                    {acc?.label}
                  </span>
                  <span className={styles.accountRowTextCurrency}>
                    {acc?.currency}
                  </span>
                </div>
              </div>
              <div>{`${acc?.amount.toFixed(constants.DIGIT_NUMBER)} ${
                acc?.symbol
              }`}</div>
            </div>
          );
        })}
      </article>
    </div>
  );
};

const Sidebar = (props: SidebarProps) => {
  const mobileAnimation = {
    initial: { opacity: 0, left: "100%" },
    animate: { opacity: 1, left: 0 },
    exit: { opacity: 0, left: "100%" },
    transition: { duration: 0.5 },
  };

  const { accounts, mobileOpen } = props;
  return (
    <>
      <div className={styles.sidebar}>
        <LogoRow />
        <div className={styles.horizontalSeparator} />
        <AvailableAccounts accounts={accounts} />
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            {...mobileAnimation}
            key="mobileMenu"
            className={styles.sidebarMobile}
          >
            <AvailableAccounts accounts={accounts} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
