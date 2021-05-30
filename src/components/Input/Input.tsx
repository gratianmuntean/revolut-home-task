import React, { useState, useEffect, useMemo } from "react";

import constants from "config/constants";

import styles from "./styles.module.css";

type InputProps = {
  currency?: string;
  balance?: number;
  symbol?: string;
  name?: string;
  register?: any;
  onChangeHandler?: any;
  flag?: any;
  which?: string;
  handleDisableSubmit?: any;
};

const Input = (props: InputProps) => {
  const {
    currency,
    balance,
    symbol,
    name,
    register,
    onChangeHandler,
    flag,
    which,
    handleDisableSubmit,
  } = props;
  const [negativeBalance, setNegativeBalance] = useState(false);

  useEffect(() => {
    setNegativeBalance(balance! < 0);
  }, [balance]);

  useEffect(() => {
    handleDisableSubmit(negativeBalance);
  }, [negativeBalance, handleDisableSubmit]);

  const balanceValue = useMemo(() => {
    return `${constants.BALANCE} ${balance?.toFixed(
      constants.DIGIT_NUMBER
    )} ${symbol}`;
  }, [balance, symbol]);

  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor={name} className={styles.label}>
          <div className={styles.currency}>
            <img src={flag} alt={currency} />
            <span>{currency}</span>
          </div>
          <div className={styles.balance}>
            <span id={`${currency}-balance`}>{balanceValue}</span>
          </div>
        </label>
        <input
          type="number"
          id={name}
          name={name}
          className={styles.input}
          {...register(name)}
          onChange={(event) => {
            const value = event.target.value;
            onChangeHandler(value, which);
          }}
          placeholder={currency}
          step="0.1"
        />
      </div>
      {negativeBalance && (
        <div className={styles.errorMessage}>
          <span>exceeds balance</span>
        </div>
      )}
    </>
  );
};

Input.defaultProps = {
  currency: "GBP",
  balance: 1000,
  symbol: "£",
};

export default Input;
