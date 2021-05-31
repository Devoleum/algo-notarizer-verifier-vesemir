import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./component/Header";
import Verifier from "./component/Verifier";
import Notarizer from "./component/Notarizer";
import "./index.css";

const App = () => (
  <div className="container">
    <h1 className="title">Devoleum - Algorand Verifier</h1>
    <Router>
      <nav>
        <Link to="/verifier">Verifier</Link> |{" "}
        <Link to="/notarizer">Notarizer</Link>
      </nav>
      <Header />
      <Switch>
        <Route path="/notarizer">
          <Notarizer />
        </Route>
        <Route path="/:id?">
          <Verifier />
        </Route>
        <Route>
          <h2 className="title">404 not found</h2>
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
