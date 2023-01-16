const CONTRACT_ADDRESS = "0xDd653216E01faD9f42D8bCEcc9fc12c374B7d655"
const META_DATA_URL = "ipfs://bafyreif24mxzrfqodbtrd4dwxh24eabs3rh6jsifckpnq25dn42ntlatdi/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });

   // npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai

   //查看 https://testnets.opensea.io/jackluo