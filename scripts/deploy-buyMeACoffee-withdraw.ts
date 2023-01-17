import { ethers } from "hardhat";
const abi =require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json")
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
async function getBalance(provider: { getBalance: (arg0: any) => any; }, address: any) {
  const balanceBigInt = await provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress="0xbBF3288B8E2403F88D7cfcd7d37dA9B39013DC52";
  const contractABI = abi.abi;
  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new ethers.Wallet(PRIVATE_KEY!=undefined?PRIVATE_KEY:'', provider);

  // Instantiate connected contract.
  const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

  // Check starting balances.
  console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
  const contractBalance = await getBalance(provider, buyMeACoffee.address);
  console.log("current balance of contract: ", await getBalance(provider, buyMeACoffee.address), "ETH");

  // Withdraw funds if there are funds to withdraw.
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..")
    const withdrawTxn = await buyMeACoffee.withdrawTips();
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  // Check ending balance.
  console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

//部署 <--> npx hardhat run scripts/deploy-buyMeACoffee-withdraw.ts


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
