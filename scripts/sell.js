require('dotenv').config();
const Web3 = require("web3");
const { OpenSeaPort, Network } = require("opensea-js");
const MnemonicWalletSubprovider = require("@0x/subproviders")
  .MnemonicWalletSubprovider;
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider('https://eth-rinkeby.alchemyapi.io/v2/moQAC0Sc8JrOx3LtKbbB6c8u1fj9Kpaj')


const BASE_DERIVATION_PATH = `44'/60'/0'/0`;

const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({
  mnemonic: process.env.MNEMONIC,
  baseDerivationPath: BASE_DERIVATION_PATH,
});

const infuraRpcSubprovider = new RPCSubprovider({
  rpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/SlMyqHYa1_npivxeEFNtfzp00MEx9LGx"
});

const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(mnemonicWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

const seaport = new OpenSeaPort(providerEngine, {
  networkName: Network.Rinkeby
})

const tokenAddress = "0xcfed528d950477bb4199f0c430fd23c724c67b90"
// const tokenAddress = "0x8d0c4336d3c89bdb44e554bbaedc26e593822cc1" // mumbai
const accountAddress = "0x92331F49112f6424Af51b26f0D18A2C396541bDC"

const main = async () => {
  const asset = await seaport.api.getAsset({
    // tokenAddress: "0xd48200eea83808251b8c3e774ca4d8cde2ba8fd6", // string
    tokenAddress, // rinkeby
    tokenId: 1,
  })

  // console.log(asset)

  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)

  const listing = await seaport.createSellOrder({
    asset: {
      tokenId: 2,
      tokenAddress,
    },
    accountAddress,
    startAmount: 2,
    expirationTime
  })

  console.log(listing)
}

main()
