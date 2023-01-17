# Sample Hardhat Project
## 如果部署到外网 报错了
```
TypeError: Cannot read properties of null (reading 'sendTransaction')
```
## 就是帐号有问题!!! 查看 hardhat.config.ts
```
```


# 用 NFT 制作 SVG 
## 验证合约
```
npx hardhat verify --network PolygonMumbai 0x1577162DCcfF1959bC113F956DCb41867347AF5b
```
## logs 多试两次
```
nftschool.dev-demo git:(chain-battles) ✗ npx hardhat verify --network PolygonMumbai 0x1577162DCcfF1959bC113F956DCb41867347AF5b
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/ChainBattles.sol:ChainBattles at 0x1577162DCcfF1959bC113F956DCb41867347AF5b
for verification on the block explorer. Waiting for verification result...

Successfully verified contract ChainBattles on Etherscan.
https://mumbai.polygonscan.com/address/0x1577162DCcfF1959bC113F956DCb41867347AF5b#code
```
## 调用了几次，等级是升了，但是 opensea 上面没有升级，用上面的地址，查询到浏览器显示是升能了



This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
