require('dotenv').config();
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MindlessLines.sol/MindlessLines.json");

// 1 token rinkeby
// const transaction = "0xd7c5d437af3364b6a42662cc24f25fbc9488d14a8cfaf6924f0e2fe5d5d9c668";
// 20 tokens rinkeby
// const transaction = "0xd6085f076dfa6b885441b4717ad048ca42580d6831e0d76f2218483c0786a006";
// reserve - failed
const transaction = "0xf352399cfc4da7e096b439ad17a707007664310e304a23f429222bf052c74b4e";

async function getTransaction() {
  web3.eth.getTransactionReceipt(transaction, (error, transaction) => {
    if (error) {
      console.log(error);
      return;
    }
    if (transaction.to.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
      console.log("Wrong contract address");
      return;
    }
    if (!transaction.status) {
      console.log("Transactions failed");
      return;
    }

    console.log(transaction);
  })
}

getTransaction();
