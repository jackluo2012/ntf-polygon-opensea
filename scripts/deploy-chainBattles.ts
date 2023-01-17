import { ethers } from "hardhat";

async function main() {
  const ChainBattles = await ethers.getContractFactory("ChainBattles");
  const chainBattles = await ChainBattles.deploy();

  await chainBattles.deployed();

  console.log(`ChainBattles deployed to ${chainBattles.address}`);
}

//部署 <--> npx hardhat run scripts/deploy-chainBattles.ts --network PolygonMumbai 

//ChainBattles deployed to 0xDd653216E01faD9f42D8bCEcc9fc12c374B7d655
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
