// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'

// The 'fs' builtin module on Node.js provides access to the file system
import fs from 'fs';

// The 'path' module provides helpers for manipulating filesystem paths
import dotenv from 'dotenv'
//require('dotenv').config();
dotenv.config()
console.log(process.env.NFT_STORAGE_API_KEY)
// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY
console.log(NFT_STORAGE_KEY);

async function storeAsset() {
    // load the file from disk
    // const image = await fileFromPath(imagePath)
    const image = new File(
        [await fs.promises.readFile('assets/MyExampleNFT.png')],
        'jackluoNFT.png',
        {type:'image/png'}
    )
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    const metadata =  await nftstorage.store({
        image,
        name:"ExampleNFT",
        description:"My ExampleNFT is an awesome artwork!",
    })
    console.log(metadata);
    console.log(metadata.url);
    return metadata;
}
storeAsset().then((result)=>{
    console.log(result);
    process.exit(0)
}).catch((error)=>{
    console.log(error);
});


// 部署  node scripts/store-asset.mjs
