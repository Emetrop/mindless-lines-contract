require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.FROM_PUBLIC_KEY;
const PRIVATE_KEY = process.env.FROM_PRIVATE_KEY;
const TO_PUBLIC_KEY = process.env.PUBLIC_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MindlessLines.sol/MindlessLines.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

// function safeTransferFrom(
//   address from,
//   address to,
//   uint256 tokenId,
// )

async function transfer() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': CONTRACT_ADDRESS,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.safeTransferFrom(`0x${PUBLIC_KEY}`, `0x${TO_PUBLIC_KEY}`, 1).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

transfer();
