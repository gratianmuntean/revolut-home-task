import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const SELL = "Sell";
const BUY = "Buy";

const FIRST = "first";
const SECOND = "second";

export const convertAmount = (value: any, fromCurrency: string, toCurrency: string, rates: any) => {
  console.log('value,', value)
  const numberValue = Number(value);
  const fromToBase = numberValue / rates[fromCurrency];
  const baseTo = fromToBase * rates[toCurrency];
  console.log('baseto', baseTo);
  return Number(baseTo.toFixed(2));
}

const getElementByKey = (list: any, key: string) => {
  return list.find((el: any) => el.currency === key)
}

export const buildAccounts = (accounts: any, from: any, to: any, amount: number, rates: any, operation: string) => {
  const fromKey = from?.currency;
  const toKey = to?.currency;

  const fromAccount = accounts.find((el: any) => el.currency === fromKey);
  const toAccount = accounts.find((el: any) => el.currency === toKey);
  const convertedAmount = convertAmount(amount, fromAccount?.currency, toAccount?.currency, rates);

  if (operation === SELL) {
    fromAccount.amount -= Number(amount);
    toAccount.amount += Number(convertedAmount);
  }
  if (operation === BUY) {
    fromAccount.amount += Number(amount);
    toAccount.amount -= Number(convertedAmount);
  }

  return [...accounts];
}

export const getLeftValues = (accounts: any, from: any, to: any, amount: number, rates: any, operation: string, which: string) => {
  const fromKey = from?.currency;
  const toKey = to?.currency;

  const fromAccount = getElementByKey(accounts, fromKey);
  const toAccount = getElementByKey(accounts, toKey);

  let convertedAmount;

  if (which === FIRST) {
    convertedAmount = convertAmount(amount, fromAccount?.currency, toAccount?.currency, rates);
  } else {
    convertedAmount = convertAmount(amount, toAccount?.currency, fromAccount?.currency, rates);
  }

  console.log('cnovert', which, convertedAmount)
  const cloneFromAccount = { ...fromAccount };
  const cloneToAccount = { ...toAccount };

  const properAmount = which === FIRST ? amount : convertedAmount;
  console.log('proper', properAmount);
  if (operation === SELL) {
    cloneFromAccount.amount -= Number(properAmount);
    cloneToAccount.amount += Number(convertedAmount);
  }
  if (operation === BUY) {
    console.log('  cloneFromAccount.amount', cloneFromAccount.amount, amount)
    cloneFromAccount.amount += Number(properAmount);
    cloneToAccount.amount -= Number(convertedAmount);
  }

  console.log(' { cloneFromAccount, cloneToAccount };', { cloneFromAccount, cloneToAccount })
  return { cloneFromAccount, cloneToAccount };

}