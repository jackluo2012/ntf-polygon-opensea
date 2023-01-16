import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: 
        process.env.GOERLI_PRIVATE_KEY !== undefined ? [process.env.GOERLI_PRIVATE_KEY] : [],
    },
    PolygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: 
          PRIVATE_KEY!==undefined?[PRIVATE_KEY]:[]
    }

  }
};

export default config;
