import React, { useState } from "react";
import getData from "../utils/getData";
import { keccak } from "hash-wasm";
import {
  useParams
} from "react-router-dom";

const Verifier = () => {
  let { id = null} = useParams();
  const [step, setStep] = useState(null);
  const [algoHash, setAlgoHash] = useState(null);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(id);

  const getDevoleumStep = async () => {
    setError(null);
    setStep(null);
    setAlgoHash(null);

    let step = await getData(`${process.env.API_BASE_URL}/api/steps/${itemId}`);
    if (!step.uri || !step.test_algo_notarization) {
      setError("Something went wrong! Try another ID.");
      return;
    }
    const jsonContent = await getData(step.uri);
    step.jsonHash = await calcHash(
      JSON.stringify(jsonContent),
      step.randomizeProof
    );
    setStep(step);
    await getAlgoNote(step.test_algo_notarization);
  };

  const calcHash = async (content, random) => {
    const hash = await keccak(content + random, 256);
    return hash;
  };

  const getAlgoNote = async (url) => {
    const baseUrl = "https://testnet.algoexplorer.io/tx/";
    const txId = url.substring(baseUrl.length);
    console.log(url);
    let data = await getData(
      "https://new.testnet.algoexplorerapi.io/v2/transactions/" + txId
    );
    data = JSON.parse(atob(data.transaction.note));
    setAlgoHash(data.hash);
  };

  return (
    <div>
      <div>
        <span className="label">Please insert the Step ID</span>
      </div>
      <input
        className="input"
        type="text"
        onChange={(e) => setItemId(e.target.value)}
        value={itemId}
      />
      <div>
        <button className="button" onClick={() => getDevoleumStep()}>
          Verify Step
        </button>
      </div>
      <span>{error}</span>
      <br />
      <br />
      {algoHash && (
        <div>
          <div className="tab-with-corner">
            Devoleum Step{" - "}
            {algoHash === step.jsonHash ? (
              <span style={{ color: " #44f1a6" }}>Matching</span>
            ) : (
              <span style={{ color: "red" }}>Not Matching</span>
            )}
          </div>
          <div className="boxed">
            <div>
              <span className="label">Step ID: </span>
              {step._id}
            </div>
            <div>
              <span className="label">Step name: </span>
              <a
                href={"https://app.devoleum.com/step/" + step._id}
                target="_blank"
                rel="noopener noreferrer"
              >
                {step.name}
              </a>
            </div>
            <div>
              <span className="label">JSON hash: </span>
              {step.jsonHash}
            </div>
            <div>
              <span className="label">Algorand hash: </span>
              {algoHash}
            </div>
            <div>
              <span className="label">Algorand tx: </span>
              <a
                href={step.test_algo_notarization}
                target="_blank"
                rel="noopener noreferrer"
              >
                {step.test_algo_notarization}
              </a>
            </div>
            <div>
              <span className="label">JSON link: </span>
              <a href={step.uri} target="_blank" rel="noopener noreferrer">
                {step.uri}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verifier;
