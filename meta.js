// Initialize an empty array to store NFTs
const NFTs = [];

// Function to mint an NFT
function mintNFT(name, img, nickname, currency, value) {
    const nft = {
        name,
        img,
        nickname,
        currency,
        value
    };
    NFTs.push(nft);
}

// Function to list all minted NFTs
function listNFTs() {
    console.log("\nList of minted NFTs:");
    NFTs.forEach((nft) => {
        console.log(`Name: ${nft.name}`);
        console.log(`Image: ${nft.img}`);
        console.log(`Nickname: ${nft.nickname}`);
        console.log(`Currency: ${nft.currency}`);
        console.log(`Value: ${nft.value}\n`);
    });
}

// Function to get the total supply of NFTs
function getTotalSupply() {
    console.log(`Total number of minted NFTs: ${NFTs.length}`);
}

// Mint some NFTs
mintNFT("dogecoin", "blackforest", "dcx", "dollar", 100);
mintNFT("ethereum", "galaxy", "ethx", "ether", 200);
mintNFT("solana", "sunset", "solx", "sol", 150);
mintNFT("cardano", "rainbow", "adax", "ada", 120);

// List all minted NFTs
listNFTs();

// Get the total supply
getTotalSupply();