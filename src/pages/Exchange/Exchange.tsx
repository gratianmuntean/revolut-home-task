import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "components/Input";
import Button from "components/Button";
import Switch from "components/Switch";
import Select from "components/Select";

import { AppContext } from "contexts/AppContext";

import { convertAmount, buildAccounts } from "helpers";

import styles from "./styles.module.css";

type ExchangeProps = {
  accounts: any;
  setAccounts: any;
};

const SELL = "Sell";
const BUY = "Buy";
const FIRST = "first";
const SECOND = "second";

const Exchange = (props: ExchangeProps) => {
  const { accounts, setAccounts } = props;

  const [operation, setOperation] = useState(SELL);
  const [operationChecked, setOperationChecked] = useState(false);

  const [firstCurrency, setFirstCurrency] = useState(accounts[0]);
  const [secondCurrency, setSecondCurrency] = useState(accounts[1]);

  const { rates, base } = useContext(AppContext);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (values: any) => {
    const sellAmount = Number(values[firstCurrency?.currency]);
    const sellResult = firstCurrency?.amount - sellAmount;

    const newAccounts = buildAccounts(
      accounts,
      firstCurrency,
      secondCurrency,
      sellAmount,
      rates
    );

    setAccounts(newAccounts);
  };

  const onChangeHandler = (value: number, currency: string) => {};

  const onChangeCurrency = (value: string, which: string) => {
    const account = accounts.find((el: any) => el?.currency === value);
    if (which === FIRST) {
      setFirstCurrency(account);
    } else {
      setSecondCurrency(account);
    }
  };

  useEffect(() => {
    setOperation(operationChecked ? SELL : BUY);
  }, [operationChecked]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">
          <div className="row">
            <div className={`col-12 ${styles.switchRow}`}>
              <Switch
                checked={operationChecked}
                setChecked={setOperationChecked}
              />
              <h1>{`${operation} - ${accounts[0].currency}`}</h1>
            </div>
            {/* select currency row */}
            <div className={`col-6 ${styles.selectBox}`}>
              <span>Select currency:</span>
              <Select
                options={accounts}
                which={FIRST}
                name="firstCurrency"
                register={register}
                onChangeHandler={onChangeCurrency}
              />
            </div>
            <div className={`col-6 ${styles.selectBox}`}>
              <span>Select currency:</span>
              <Select
                options={accounts}
                which={SECOND}
                name="secondCurrency"
                register={register}
                onChangeHandler={onChangeCurrency}
              />
            </div>
            {/* number inputs */}
            <div className={`col-6 ${styles.inputBox}`}>
              <Input
                currency={firstCurrency.currency}
                balance={firstCurrency.amount}
                symbol={firstCurrency.symbol}
                name={firstCurrency.currency}
                register={register}
                onChangeHandler={onChangeHandler}
              />
            </div>
            <div className={`col-6 ${styles.inputBox}`}>
              <Input
                currency={secondCurrency.currency}
                balance={secondCurrency.amount}
                symbol={secondCurrency.symbol}
                name={secondCurrency.currency}
                register={register}
                onChangeHandler={onChangeHandler}
              />
            </div>
            <div className={`col-12 ${styles.buttonContainer}`}>
              <Button
                type="submit"
                className={styles.buttonExchange}
                onClick={() => {
                  console.log("submit");
                }}
              >
                Exchange now
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Exchange;
