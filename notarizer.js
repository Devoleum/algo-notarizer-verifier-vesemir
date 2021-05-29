const algosdk = require('algosdk');

const waitForConfirmation = async function (algodclient, txId) {
    let lastround = (await algodclient.status()).lastRound;
    while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId);
        if (pendingInfo.round !== null && pendingInfo.round > 0) {
            //Got the completed Transaction
            console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
            break;
        }
        lastround++;
        await algodclient.statusAfterBlock(lastround);
    }
};
//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const server = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
  'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

//Recover the account
// var mnemonic = "<your-mnemonic-string>";
var mnemonic = "portion never forward pill lunch organ biology" +
    " weird catch curve isolate plug innocent skin grunt" +
    " bounce clown mercy hole eagle soul chunk type absorb trim";
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(recoveredAccount.addr);
//check to see if account is valid
var isValid = algosdk.isValidAddress(recoveredAccount.addr);
console.log("Is this a valid address: " + isValid);


//instantiate the algod wrapper
let algodClient = new algosdk.Algod(token, server, port);
//submit the transaction
(async() => {
    //Get the relevant params from the algod
    let params = await algodClient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let feet = await algodClient.suggestedFee();

    //example of how to write an object into the notefield
    let json = '{"hash":"3bea53f3f773a4f85405cbd8537ed9cfceba61ac21ce6480011cba0ea5eacdcd", "id":"5ffb9399b44b660004ba402c"}';
    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": params.fee,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(json)
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodClient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

    await waitForConfirmation( algodClient, tx.txId );
})().catch(e => {
    console.log(e);
});

/* const readTx = async () => {
    //Get the relevant params from the algod
    let params = await algodClient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let feet = await algodClient.suggestedFee();

    //example of how to write an object into the notefield
    let json = '{"firstName":"John", "LastName":"Doe"}';
    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": params.fee,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(json)
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    //submit the transaction
    let tx = (await algodClient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

    await waitForConfirmation( algodClient, tx.txId );

    tx = (await algodClient.transactionInformation(recoveredAccount.addr, tx.txId));
    let decodeJson = algosdk.decodeObj(tx.note);
    console.log( decodeJson );
    const obj = JSON.parse(decodeJson);
    console.log(obj.firstName);
})().catch(e => {
    console.log(e);
}); */