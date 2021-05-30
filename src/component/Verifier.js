import React, { useState } from "react";
import getData from "../utils/getData";
import { keccak } from "hash-wasm";

const Verifier = () => {
  const [url, setUrl] = useState("");
  const [txId, setTxId] = useState(
    "7F2DRVZQISPF6ZC33UDORFLGW7SBU2SIF2YGBDU5SEYGR4UPNA3A"
  );
  const [hash, setHash] = useState("");
  const [itemId, setItemId] = useState("5ffb9399b44b660004ba402c");

  // https://algoexplorerapi.io/idx2/v2/transactions?txid={txid}
  // const connectAlgo = () => {
  //   AlgoSigner.connect()
  //     .then((d) => {
  //       console.log("connected: ", d);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  const getDevoleumStep = async () => {
    const data = await getData(
      `${process.env.API_BASE_URL}/api/steps/${itemId}`
    );
    console.log(data);
    const jsonContent = await getData(step.uri);
    console.log("json: ", jsonContent);
  };

  const getAlgoNote = async () => {
    let data = await getData(
      "https://new.testnet.algoexplorerapi.io/v2/transactions/" + txId
    );
    data = JSON.parse(atob(data.transaction.note));
    setHash(data.hash);
    setItemId(data.id);
  };

  return (
    <div>
      <span>Please insert the Step ID</span>
      <input
        className="input"
        type="text"
        placeholder="id"
        onChange={e => setItemId(e.target.value)}
        value={itemId}
      />
      <button className="button" onClick={() => getDevoleumStep()}>
        Verify Step
      </button>
      <br />
      <br />
      {hash && (
        <div>
          <span>id: {itemId}</span>
          <br />
          <br />
          <span>hash: {hash}</span>
        </div>
      )}
    </div>
  );
};

export default Verifier;
