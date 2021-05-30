import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import Verifier from './component/Verifier';
import './index.css';

const App = () => (
  <div className="container">
    <h1 className="title">Devoleum - Algorand Verifier</h1>
    <Header />
    <Verifier />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
