require('dotenv').config();
const abiDecoder = require('abi-decoder');
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MindlessLines.sol/MindlessLines.json");

// 1 token rinkeby
// const transaction = "0xd7c5d437af3364b6a42662cc24f25fbc9488d14a8cfaf6924f0e2fe5d5d9c668";
// 20 tokens rinkeby
const transaction = "0xd6085f076dfa6b885441b4717ad048ca42580d6831e0d76f2218483c0786a006";

async function getTransaction() {
  web3.eth.getTransaction(transaction, (error, transaction) => {
    if (error) {
      console.log(error);
      return;
    }
    if (transaction.to.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
      console.log("Wrong contract address");
      return;
    }

    abiDecoder.addABI(contract.abi);

    const decodedData = abiDecoder.decodeMethod(transaction.input);

    if (decodedData.name !== "mint" && decodedData.name !== "reserve") {
      console.log("Wrong function call");
      return;
    }

    // decodedData = {
    //   name: 'mint',
    //   params: [ { name: 'count', value: '20', type: 'uint256' } ]
    // }

    console.log(transaction)
    console.log(decodedData)
  })
}

getTransaction();

// {
//   hash: '0xd6085f076dfa6b885441b4717ad048ca42580d6831e0d76f2218483c0786a006',
//   accessList: [],
//   blockHash: '0x3951a39782dc295b8e0c1098b5634cff19a1b283189e408e0d72bddee43c3292',
//   blockNumber: 9381005,
//   chainId: '0x4',
//   from: '0x541BD6b8783b39fECF9caA0954f7054F72FCC235',
//   gas: 3534420,
//   gasPrice: '1500000067',
//   input: '0xa0712d680000000000000000000000000000000000000000000000000000000000000014',
//   maxFeePerGas: '1500000086',
//   maxPriorityFeePerGas: '1500000000',
//   nonce: 8,
//   r: '0x29656b78471afebc2efde735d433af08ff44c32fa5257e1d2713a463f3a1fe05',
//   s: '0x43ccda8bc2f691fdeed754b08e3632079788106cb9c9069f50baf00e1991c78d',
//   to: '0x04676B7CadcF816Ac50bD14BE22c2cAbB867F6F7',
//   transactionIndex: 7,
//   type: 2,
//   v: '0x0',
//   value: '600000000000000000'
// }
