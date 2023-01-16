import { ethers } from "hardhat";

async function main() {
  const ExampleNFT = await ethers.getContractFactory("ExampleNFT");
  const exampleNFT = await ExampleNFT.deploy();

  await exampleNFT.deployed();

  console.log(`ExampleNFT deployed to ${exampleNFT.address}`);
}

//部署 <--> npx hardhat run scripts/deploy-nft.ts --network PolygonMumbai 

//ExampleNFT deployed to 0xDd653216E01faD9f42D8bCEcc9fc12c374B7d655
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
