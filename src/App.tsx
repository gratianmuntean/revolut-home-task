import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL, APP_ID } from "config";

import Layout from "components/Layout";

import { AppContext } from "contexts/AppContext";

import { accountsData } from "accounts";

import constants from "config/constants";

import "./App.css";
import "./scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  console.log("constants", constants);
  const [rates, setRates] = useState([]);
  const [accounts, setAccounts] = useState(accountsData);

  useEffect(() => {
    // get rates
    getRates();
    setInterval(() => {
      getRates();
    }, constants.TIMER_GAP);
  }, []);

  const getRates = async () => {
    const response = await axios.get(`${BASE_URL}?app_id=${APP_ID}`);
    try {
      const {
        data: { rates },
      } = response;
      setRates(rates);
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ rates }}>
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
