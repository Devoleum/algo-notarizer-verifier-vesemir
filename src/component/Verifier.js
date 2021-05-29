import React, { useState } from 'react';
import useGetData from '../hooks/useGetData';

const Verifier = () => {

// https://algoexplorerapi.io/idx2/v2/transactions?txid={txid}
 const connectAlgo = () => {
    AlgoSigner.connect()
    .then((d) => {
      console.log("connected: ", d)
    })
    .catch((e) => {
      console.error(e);
    })
 }
 const getAlgoNote = () => {

 }
  return (
    <div>
      <p>You clicked times</p>
      <button onClick={() => connectAlgo()}>
        Click me
      </button>
    </div>
  );
}


export default Verifier;