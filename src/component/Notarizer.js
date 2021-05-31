import React, { useEffect, useState } from "react";
import Login from "./Login";
import NotarizeMany from "./NotarizeMany";

const Notarizer = () => {
  if (typeof AlgoSigner === "undefined")
    return (
      <h3 className="sub-title">Notarizer Error, Install AlgoSigner Pls!</h3>
    );

  const [connectStatus, setConnectStatus] = useState("loading...");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    AlgoSigner.connect()
      .then((d) => {
        setConnectStatus("success");
        AlgoSigner.accounts({
          ledger: 'TestNet'
        })
        .then((accounts) => {
          setAccount(accounts[0].address)
        })
        .catch((e) => {
          console.error("account: ", e);
        });
      })
      .catch((e) => {
        console.error(e);
        setConnectStatus("error");
      });
  });

  return (
    <div>
      <h2 className="sub-title">Notarizer</h2>
      {account ? (
        <div>
          <p className="small">Account</p>
          <p className="small">{account}</p>
          <Login />
          <NotarizeMany account={account}/>
        </div>
      ) : (
        "error"
      )}
    </div>
  );
};

export default Notarizer;
