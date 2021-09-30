const { expect, use } = require("chai")
const { deployContract, MockProvider, solidity } = require("ethereum-waffle")
const MindlessLines = require("../build/MindlessLines.json")

use(solidity)

describe("MindlessLines", () => {
  const [wallet, walletTo] = new MockProvider().getWallets()
  let ml

  beforeEach(async () => {
    ml = await deployContract(wallet, MindlessLines)
  })

  it("Should mint", async function () {
    expect(await ml.getSupply()).to.equal(0);

    await ml.mint(1, { value: 250 });

    expect(await ml.getSupply()).to.equal(1);

    await ml.mint(20, { value: 500 });

    expect(await ml.getSupply()).to.equal(3);
  });
})

// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { MockProvider } = require("ethereum-waffle");
//
// const provider = new MockProvider();
// const [wallet] = provider.getWallets();
//
// describe("MindlessLines", function () {
//   it("Should mint", async function () {
//     const MindlessLines = await ethers.getContractFactory("MindlessLines");
//     const ml = await MindlessLines.deploy();
//     await ml.deployed();
//
//     expect(await ml.getSupply()).to.equal(0);
//
//     await ml.mint(1, { value: 25 })
//
//     expect(await ml.getSupply()).to.equal(1);
//   });
// });

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();
//
//     expect(await greeter.greet()).to.equal("Hello, world!");
//
//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
//
//     // wait until the transaction is mined
//     await setGreetingTx.wait();
//
//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
