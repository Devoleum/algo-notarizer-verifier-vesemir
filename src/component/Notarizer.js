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
  const [net, setNet] = useState("TestNet");

  useEffect(() => {
    AlgoSigner.connect()
      .then((d) => {
        setConnectStatus("success");
        AlgoSigner.accounts({
          ledger: net,
        })
          .then((accounts) => {
            setAccount(accounts[0].address);
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

  const handleOptionChange = async (changeEvent) => {
    const val = changeEvent.target.value;
    setNet(val);
  };

  return (
    <div>
      <h2 className="sub-title">Notarizer</h2>
      {account ? (
        <div>
          <form>
            <div className="radio">
              <label>
                <input
                  name="net-type"
                  type="radio"
                  value="TestNet"
                  checked={net === "TestNet"}
                  onChange={handleOptionChange}
                />
                TestNet
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  name="net-type"
                  type="radio"
                  value="MainNet"
                  checked={net === "MainNet"}
                  onChange={handleOptionChange}
                />
                MainNet
              </label>
            </div>
          </form>
          <p className="small">Account</p>
          <p className="small">{account}</p>
          <Login />
          {net === 'TestNet' ? (
            <NotarizeMany account={account} net="TestNet" netKey="test_algo_notarization"/>
          ) : (
            <NotarizeMany account={account} net="MainNet" netKey="main_algo_notarization"/>
          )}
        </div>
      ) : (
        "error"
      )}
    </div>
  );
};

export default Notarizer;
