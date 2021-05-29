export const convertAmount = (value: any, fromCurrency: string, toCurrency: string, rates: any) => {
  const fromToBase = value / rates[fromCurrency];
  const baseTo = fromToBase * rates[toCurrency];
  return Number(baseTo.toFixed(2));
}

export const buildAccounts = (accounts: any, from: any, to: any, amount: number, rates: any) => {
  const fromKey = from?.currency;
  const toKey = to?.currency;

  const fromAccount = accounts.find((el: any) => el.currency === fromKey);
  fromAccount.amount -= amount;

  const toAccount = accounts.find((el: any) => el.currency === toKey);
  const convertedAmount = convertAmount(amount, fromAccount?.currency, toAccount?.currency, rates);
  toAccount.amount += convertedAmount;

  return [...accounts];
}