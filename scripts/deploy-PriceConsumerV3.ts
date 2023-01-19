import { ethers } from "hardhat";

async function main() {
  const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
  const priceConsumerV3 = await PriceConsumerV3.deploy();

  await priceConsumerV3.deployed();

  console.log(`PriceConsumerV3 deployed to ${priceConsumerV3.address}`);
}

//部署 <--> npx hardhat run scripts/deploy-PriceConsumerV3.ts --network PolygonMumbai 
//验证 <--> npx hardhat verify --network PolygonMumbai 0xa153Ba0090A0D0eD60EE0246dbeEcf1B4efc22eD
//https://mumbai.polygonscan.com/address/0xa153Ba0090A0D0eD60EE0246dbeEcf1B4efc22eD#code
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
