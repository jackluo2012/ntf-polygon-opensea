import { ethers } from "hardhat";

async function main() {

  const s_subscriptionId= 625
  const VRFD20 = await ethers.getContractFactory("VRFD20");
  const vRFD20 = await VRFD20.deploy(s_subscriptionId);

  await vRFD20.deployed();

  console.log(`VRFD20 deployed to ${vRFD20.address}`);
}

//部署 <--> npx hardhat run scripts/deploy-VRFD20.ts --network PolygonMumbai 
//验证 <--> npx hardhat verify --network PolygonMumbai 0x0Ca23193CC9FEe73233a3A93C3142448a9B9aD29
//https://mumbai.polygonscan.com/address/0xa153Ba0090A0D0eD60EE0246dbeEcf1B4efc22eD#code
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
