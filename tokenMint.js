const {
    Connection,
    clusterApiUrl,
    PublicKey
  } = require('@solana/web3.js');
  const {
    MintLayout
  } = require('@solana/spl-token');
  
  const TOKEN_MINT_ADDRESS = 'FFMjekUxcY5cxAF7qTiKt1yozaiNxZTcszEBHXeQaSX5';
  
  async function getTokenInfo() {
    // Connect to the Solana testnet cluster
    const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
  
    // Get the token's mint address
    const tokenMintAddress = new PublicKey(TOKEN_MINT_ADDRESS);
  
    // Fetch token mint info
    const tokenMintInfo = await connection.getAccountInfo(tokenMintAddress);
  
    if (tokenMintInfo) {
      const mintData = MintLayout.decode(Buffer.from(tokenMintInfo.data));
      const supply = BigInt.asUintN(64, mintData.supply); // Ensure correct BigInt handling
      const mintAuthority = new PublicKey(mintData.mintAuthority).toBase58();
  
      console.log(`Token Mint Address: ${tokenMintAddress.toBase58()}`);
      console.log(`Supply: ${supply.toString()}`);
      console.log(`Decimals: ${mintData.decimals}`);
      console.log(`Is Initialized: ${mintData.isInitialized}`);
      console.log(`Mint Authority: ${mintAuthority}`);
    } else {
      console.log('Token mint information not found.');
    }
  }
  
  getTokenInfo().catch(err => {
    console.error(err);
  });
  
  