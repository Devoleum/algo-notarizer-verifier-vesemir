import React from 'react';
import ReactDOM from 'react-dom';
import Verifier from './component/Verifier';
import './index.css';

const App = () => (
  <div className="App">
    <h1>Devoleum - Algorand Verifier</h1>
    <Verifier />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}