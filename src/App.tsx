import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL, APP_ID } from "config";

import "./App.css";
import "./scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "components/Layout";

const App = () => {
  const [rates, setRates] = useState([]);
  const [base, setBase] = useState("");

  useEffect(() => {
    // get rates
    getRates();
  }, []);

  useEffect(() => {
    console.log("rates", rates);
    console.log("base", base);
  }, [rates, base]);

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
      <Layout />
    </div>
  );
};

export default App;
