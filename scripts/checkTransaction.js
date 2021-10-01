require('dotenv').config();
const abiDecoder = require('abi-decoder');
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MindlessLines.sol/MindlessLines.json");

// 1 token rinkeby
// const transactionAddress = "0xd7c5d437af3364b6a42662cc24f25fbc9488d14a8cfaf6924f0e2fe5d5d9c668";
// 20 tokens rinkeby
const transactionAddress = "0xd6085f076dfa6b885441b4717ad048ca42580d6831e0d76f2218483c0786a006";
// 5 reserve rinkeby
// const transactionAddress = "0xe8186d5931c730fe58547b37782c0d523b14cac5865724fdc92d4876e649e126";
// reserve - failed
// const transactionAddress = "0xf352399cfc4da7e096b439ad17a707007664310e304a23f429222bf052c74b4e";

async function checkTransaction() {
  web3.eth.getTransactionReceipt(transactionAddress, (error, receipt) => {
    if (error) {
      console.log(error);
      return;
    }
    if (receipt.to.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
      console.log("Wrong contract address");
      return;
    }
    if (!receipt.status) {
      console.log("Transactions failed");
      return;
    }

    web3.eth.getTransaction(transactionAddress, (error, trans) => {
      if (error) {
        console.log(error);
        return;
      }

      abiDecoder.addABI(contract.abi);

      const decodedData = abiDecoder.decodeMethod(trans.input);

      if (decodedData.name !== "mint" && decodedData.name !== "reserve") {
        console.log("Wrong function call");
        return;
      }

      const logs = abiDecoder.decodeLogs(receipt.logs)
        .filter(log => log.name === "Transfer");

      const tokenIds = logs
        .reduce((acc, val) => [...acc, ...val.events], [])
        .filter(event => event.name === "tokenId")
        .map(event => parseInt(event.value))

      console.log(tokenIds)
    })
  })
}

checkTransaction();
