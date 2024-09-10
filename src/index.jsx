import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>

        <App></App>

    </BrowserRouter>
    , rootElement);
