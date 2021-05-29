import usdFlag from 'assets/flags/usdFlag.svg';
import eurFlag from 'assets/flags/eurFlag.svg';
import ronFlag from 'assets/flags/ronFlag.png';
import gbpFlag from 'assets/flags/gpbFlag.png';

export const accountsData = [
  {
    label: 'Romanian Leu',
    currency: 'RON',
    flag: ronFlag,
    symbol: 'RON',
    amount: 1000,
  },
  {
    label: 'British Pound',
    currency: 'GBP',
    flag: gbpFlag,
    symbol: '£',
    amount: 0,
  },
  {
    label: 'US Dollar',
    currency: 'USD',
    flag: usdFlag,
    symbol: '$',
    amount: 0,
  },
  {
    label: 'Euro',
    currency: 'EUR',
    flag: eurFlag,
    symbol: '€',
    amount: 0,
  },

]