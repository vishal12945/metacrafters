let NFTs = [];
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


function listNFTs() {
    console.log("\nList of minted NFTs:");
    for(let i=0 ; i<NFTs.length ; i++) {
        console.log(
        "\n\nName : ",NFTs[i].name,
        "\nimg : ",NFTs[i].img,
        "\nnickname : ",NFTs[i].nickname,
        "\ncurrency : ",NFTs[i].currency,
        "\nvalue : ",NFTs[i].value)
    }
}


function getTotalSupply() {
    console.log(`Total number of minted NFTs: ${NFTs.length}`);
}

mintNFT("dogecoin", "blackforest", "dcx", "dollar", 100);
mintNFT("ethereum", "galaxy", "ethx", "ether", 200);
mintNFT("solana", "sunset", "solx", "sol", 150);
mintNFT("cardano", "rainbow", "adax", "ada", 120);


listNFTs();

getTotalSupply();