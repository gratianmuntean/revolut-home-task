import React from "react";

import styles from "./styles.module.css";

type InputProps = {
  currency?: string;
  balance?: number;
  symbol?: string;
  name?: string;
  register?: any;
  onChangeHandler?: any;
};

const Input = (props: InputProps) => {
  const { currency, balance, symbol, name, register, onChangeHandler } = props;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        <div className={styles.currency}>{`${currency}`}</div>
        <div className={styles.balance}>{`Balance: ${balance} ${symbol}`}</div>
      </label>
      <input
        type="number"
        id={name}
        name={name}
        className={styles.input}
        {...register(name)}
        onChange={(event) => {
          const value = event.target.value;
          onChangeHandler(value, currency);
        }}
        placeholder={currency}
      />
    </div>
  );
};

Input.defaultProps = {
  currency: "GBP",
  balance: 1000,
  symbol: "£",
};

export default Input;
