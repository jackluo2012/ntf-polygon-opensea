import { ethers } from "hardhat";


async function getBalance(address: string | Promise<string>) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses: any) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

async function printMemos(memos: any) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  
  const [owner, tipper, tipper2, tipper3] = await ethers.getSigners();
  
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();

  console.log(`BuyMeACoffee deployed to ${buyMeACoffee.address}`);
  //检查地址
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);
  const tip = {value: ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(tipper).buyCoffee("Carolina", "You're the best!", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing teacher", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Kay", "I love my Proof of Knowledge", tip);
  // Check balances after the coffee purchase.
  console.log("== bought coffee ==");
  await printBalances(addresses);

  // Withdraw.
  await buyMeACoffee.connect(owner).withdrawTips();
  // Check balances after withdrawal.
  console.log("== withdrawTips ==");
  await printBalances(addresses);
  // Check out the memos.
  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);

}

//部署 <--> npx hardhat run scripts/deploy-buyMeACoffee.ts --network PolygonMumbai 
//部署 <--> npx hardhat run scripts/deploy-buyMeACoffee.ts
//BuyMeACoffee deployed to 0xDd653216E01faD9f42D8bCEcc9fc12c374B7d655
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
function localhost_deploy(){
  main().then(()=>{
    process.exit(0)
  }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
async function goerli_deploy(){
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();

  console.log(`BuyMeACoffee deployed to ${buyMeACoffee.address}`);

}
//部署 <--> npx hardhat run scripts/deploy-buyMeACoffee.ts --network goerli 
goerli_deploy()