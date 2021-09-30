require('dotenv').config();
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MindlessLines.sol/MindlessLines.json");
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

async function tokenURI() {
  const supply = await nftContract.methods.tokenURI(0).call()

  console.log(supply)
}

tokenURI();
