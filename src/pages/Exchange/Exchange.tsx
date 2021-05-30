import React, { useState, useContext, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

import Input from "components/Input";
import Button from "components/Button";
import Switch from "components/Switch";
import Select from "components/Select";

import { AppContext } from "contexts/AppContext";

import { convertAmount, buildAccounts, getLeftValues } from "helpers";
import constants from "config/constants";

import styles from "./styles.module.css";

type ExchangeProps = {
  accounts: any;
  setAccounts: any;
};
const Exchange = (props: ExchangeProps) => {
  const { accounts, setAccounts } = props;

  const [operation, setOperation] = useState(constants.SELL);
  const [operationChecked, setOperationChecked] = useState(true);
  const [whichInput, setWhichInput] = useState(constants.FIRST);
  const [disableSubmit, handleDisableSubmit] = useState(false);

  const [firstCurrency, setFirstCurrency] = useState(accounts[0]);
  const [secondCurrency, setSecondCurrency] = useState(accounts[2]);

  const { rates } = useContext(AppContext);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (values: any) => {
    let sellAmount;
    if (whichInput === constants.FIRST) {
      sellAmount = Number(values[firstCurrency?.currency]);
    } else {
      sellAmount = Number(values[secondCurrency?.currency]);
    }
    const from =
      whichInput === constants.FIRST ? firstCurrency : secondCurrency;
    const to = whichInput === constants.FIRST ? secondCurrency : firstCurrency;

    const newAccounts = buildAccounts(
      accounts,
      from,
      to,
      sellAmount,
      rates,
      operation,
      whichInput
    );

    setAccounts(newAccounts);
  };

  const onChangeHandler = (value: number, which: string) => {
    const cloneAccounts = [...accounts];
    const sellAmount = value;

    const from =
      whichInput === constants.FIRST ? firstCurrency : secondCurrency;
    const to = whichInput === constants.FIRST ? secondCurrency : firstCurrency;

    const newAccounts = getLeftValues(
      cloneAccounts,
      from,
      to,
      sellAmount,
      rates,
      operation,
      which
    );

    if (whichInput === constants.FIRST) {
      setFirstCurrency({ ...newAccounts.cloneFromAccount });
      setSecondCurrency({ ...newAccounts.cloneToAccount });
    } else {
      setFirstCurrency({ ...newAccounts.cloneToAccount });
      setSecondCurrency({ ...newAccounts.cloneFromAccount });
    }

    setWhichInput(which);
  };

  const onChangeCurrency = (value: string, which: string) => {
    const account = accounts.find((el: any) => el?.currency === value);
    if (which === constants.FIRST) {
      setFirstCurrency(account);
    } else {
      setSecondCurrency(account);
    }
    setValue(secondCurrency.currency, 0);
    setValue(firstCurrency.currency, 0);
  };

  const clearValues = useCallback(
    (which) => {
      if (which === constants.FIRST) {
        setValue(secondCurrency.currency, 0);
      } else {
        setValue(firstCurrency.currency, 0);
      }
    },
    [firstCurrency, secondCurrency, setValue]
  );

  useEffect(() => {
    setOperation(operationChecked ? constants.SELL : constants.BUY);
  }, [operationChecked]);

  useEffect(() => {
    clearValues(whichInput);
  }, [whichInput, clearValues]);

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
              <h1>{`${operation} - ${firstCurrency.currency}`}</h1>
            </div>
            {/* market order value */}
            <div className={`col-12 ${styles.marketOrder}`}>
              {constants.MARKET_ORDER} {firstCurrency?.currency} ={" "}
              {convertAmount(
                1,
                firstCurrency?.currency,
                secondCurrency?.currency,
                rates
              )}
            </div>
            {/* select currency row */}
            <div className={`col-12 col-lg-6 ${styles.selectBox}`}>
              <span>{constants.FROM_CURRENCY}</span>
              <Select
                options={accounts}
                which={constants.FIRST}
                name="firstCurrency"
                register={register}
                onChangeHandler={onChangeCurrency}
                defaultValue={firstCurrency?.currency}
              />
            </div>
            <div className={`col-12 col-lg-6 ${styles.selectBox}`}>
              <span>{constants.TO_CURRENCY}</span>
              <Select
                options={accounts}
                which={constants.SECOND}
                name="secondCurrency"
                register={register}
                onChangeHandler={onChangeCurrency}
                defaultValue={secondCurrency?.currency}
              />
            </div>
            {/* number inputs */}
            <div className="col-12 col-lg-6">
              <Input
                currency={firstCurrency.currency}
                balance={firstCurrency.amount}
                symbol={firstCurrency.symbol}
                name={firstCurrency.currency}
                register={register}
                flag={firstCurrency.flag}
                which={constants.FIRST}
                onChangeHandler={onChangeHandler}
                handleDisableSubmit={handleDisableSubmit}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Input
                currency={secondCurrency.currency}
                balance={secondCurrency.amount}
                symbol={secondCurrency.symbol}
                name={secondCurrency.currency}
                flag={secondCurrency.flag}
                register={register}
                which={constants.SECOND}
                onChangeHandler={onChangeHandler}
                handleDisableSubmit={handleDisableSubmit}
              />
            </div>
            <div className={`col-12 ${styles.buttonContainer}`}>
              <Button
                type="submit"
                className={styles.buttonExchange}
                disabled={disableSubmit}
              >
                {constants.EXCHANGE_NOW}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Exchange;
