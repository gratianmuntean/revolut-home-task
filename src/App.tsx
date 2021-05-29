import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL, APP_ID } from "config";

import Layout from "components/Layout";

import { AppContext } from "contexts/AppContext";

import { accountsData } from "accounts";

import "./App.css";
import "./scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const TIMER_GAP = 60000;

const App = () => {
  const [rates, setRates] = useState([]);
  const [base, setBase] = useState("");
  const [accounts, setAccounts] = useState(accountsData);

  useEffect(() => {
    // get rates
    getRates();
    setInterval(() => {
      getRates();
    }, TIMER_GAP);
  }, []);

  useEffect(() => {
    console.log("setAccounts DIN AP", accounts);
  }, [accounts]);

  const getRates = async () => {
    const response = await axios.get(`${BASE_URL}?app_id=${APP_ID}`);
    try {
      const {
        data: { rates, base },
      } = response;
      setRates(rates);
      setBase(base);
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ rates, base }}>
        <Layout
          accounts={accounts}
          setAccounts={(value: any) => {
            setAccounts([...value]);
          }}
        />
      </AppContext.Provider>
    </div>
  );
};

export default App;
