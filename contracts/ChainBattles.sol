// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenIdToLevels;

    constructor() ERC721("Chain Battles", "CBTLS"){
    }
    /**
    生成字符: 生成和更新我们的NFT的SVG映像
    getLevels: 获得NFT的当前级别
    getokenURI: 获得NFT的TokenURI
    薄荷: 薄荷-当然
    火车: 培训NFT并提高其水平
    */
    //生成字符: 生成和更新我们的NFT的SVG映像
    
    function generateCharacter(uint256 tokenId) public view returns(string memory){
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Warrior",'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ",getLevels(tokenId),'</text>',
            '</svg>'
        );
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )    
        );
    }
    //创建getLevels函数以检索NFT级别
    function getLevels(uint256 tokenId) public view returns (string memory) {
        uint256 levels = tokenIdToLevels[tokenId];
        return levels.toString();
    }
    //创建getTokenURI函数以生成tokenURI

    function getTokenURI(uint256 tokenId) public view returns (string memory){
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Chain Battles #', tokenId.toString(), '",',
                '"description": "Battles on chain",',
                '"image": "', generateCharacter(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }
    /**
     * 创建薄荷功能以使用链上元数据创建NFT
     * 初始化级别值
     * 设置令牌URI
     */

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenIdToLevels[newItemId] = 0;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }
    //创建火车功能以提高您的NFT水平
    function train(uint256 tokenId) public {
        //如果令牌存在,请使用 _存在( )功能符合ERC721标准,
        require(_exists(tokenId), "Please use an existing token");
        // 如果NFT的所有者是 msg.sender (调用函数)的钱包
        require(ownerOf(tokenId) == msg.sender, "You must own this token to train it");
        uint256 currentLevel = tokenIdToLevels[tokenId];
        tokenIdToLevels[tokenId] = currentLevel + 1;
        //最后,我们调用传递tokenId的_setTokenURI函数以及getTokenURI ( )的返回值
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }

}
