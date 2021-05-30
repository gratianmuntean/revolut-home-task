import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Header from "components/Header";
import { buildAccounts } from "helpers";

import {
  accountsMockT1,
  accountsMockResultT1,
  accountsMockT2,
  accountsMockResultT2,
  fromT1,
  toT1,
  fromT2,
  toT2,
  amountT1,
  amountT2,
  mockedRates,
  operation,
  whichInput,
} from "testMock";
import constants from "config/constants";

test("check header name", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Exchange Page/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(constants.EXCHANGE_PAGE);
});

// Sell 200 RON as USD
test("convert 200 RON to USD", () => {
  const accounts = buildAccounts(
    accountsMockT1,
    fromT1,
    toT1,
    amountT1,
    mockedRates,
    operation,
    whichInput
  );

  expect(accounts).toEqual(accountsMockResultT1);
});

// Sell 100 EUR as GBP
test("convert 100 EUR to GBP", () => {
  const accounts = buildAccounts(
    accountsMockT2,
    fromT2,
    toT2,
    amountT2,
    mockedRates,
    operation,
    whichInput
  );

  expect(accounts).toEqual(accountsMockResultT2);
});
