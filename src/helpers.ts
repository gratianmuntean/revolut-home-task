import constants from 'config/constants';

export const convertAmount = (value: any, fromCurrency: string, toCurrency: string, rates: any) => {
  const numberValue = Number(value);
  const fromToBase = numberValue / rates[fromCurrency];
  const baseTo = fromToBase * rates[toCurrency];
  return Number(baseTo.toFixed(constants.DIGIT_NUMBER));
}

const getElementByKey = (list: any, key: string) => {
  return list.find((el: any) => el.currency === key)
}

const sellFormula = (fromAccount: any, toAccount: any, amount: number, convertedAmount: number) => {
  fromAccount.amount -= Number(amount);
  toAccount.amount += Number(convertedAmount);
}

const buyFormula = (fromAccount: any, toAccount: any, amount: number, convertedAmount: number) => {
  fromAccount.amount += Number(amount);
  toAccount.amount -= Number(convertedAmount);
}

export const buildAccounts = (accounts: any, from: any, to: any, amount: number, rates: any, operation: string, whichInput: string) => {
  const fromKey = from?.currency;
  const toKey = to?.currency;

  const fromAccount = accounts.find((el: any) => el.currency === fromKey);
  const toAccount = accounts.find((el: any) => el.currency === toKey);
  const convertedAmount = convertAmount(amount, fromAccount?.currency, toAccount?.currency, rates);

  if (operation === constants.SELL) {
    if (whichInput === constants.FIRST) {
      sellFormula(fromAccount, toAccount, amount, convertedAmount);
    } else {
      buyFormula(fromAccount, toAccount, amount, convertedAmount);
    }
  }

  if (operation === constants.BUY) {
    if (whichInput === constants.FIRST) {
      buyFormula(fromAccount, toAccount, amount, convertedAmount);
    } else {
      sellFormula(fromAccount, toAccount, amount, convertedAmount);
    }
  }

  return [...accounts];
}

export const getLeftValues = (accounts: any, from: any, to: any, amount: number, rates: any, operation: string, whichInput: string) => {
  const fromKey = from?.currency;
  const toKey = to?.currency;

  const fromAccount = getElementByKey(accounts, fromKey);
  const toAccount = getElementByKey(accounts, toKey);

  const convertedAmount = convertAmount(amount, fromAccount?.currency, toAccount?.currency, rates);

  const cloneFromAccount = { ...fromAccount };
  const cloneToAccount = { ...toAccount };

  if (operation === constants.SELL) {
    if (whichInput === constants.FIRST) {
      sellFormula(cloneFromAccount, cloneToAccount, amount, convertedAmount);
    } else {
      buyFormula(cloneFromAccount, cloneToAccount, amount, convertedAmount);
    }
  }

  if (operation === constants.BUY) {
    if (whichInput === constants.FIRST) {
      buyFormula(cloneFromAccount, cloneToAccount, amount, convertedAmount);
    } else {
      sellFormula(cloneFromAccount, cloneToAccount, amount, convertedAmount);
    }
  }

  return { cloneFromAccount, cloneToAccount };

}