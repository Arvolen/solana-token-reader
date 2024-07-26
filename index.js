const {
    Connection,
    clusterApiUrl,
    PublicKey
  } = require('@solana/web3.js');
  const {
    TOKEN_PROGRAM_ID,
    AccountLayout
  } = require('@solana/spl-token');
  
  // Replace with your desired token mint address and wallet address
  const TOKEN_MINT_ADDRESS = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
  const WALLET_ADDRESS = '5dPLadZvtSvm2xhmKyzf2joiwHTrTbDjVGjnSmQDPPXx';
  
  async function main() {
    // Connect to the Solana devnet cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    // Get the wallet's public key
    const walletPublicKey = new PublicKey(WALLET_ADDRESS);
  
    // Get the token's mint address
    const tokenMintAddress = new PublicKey(TOKEN_MINT_ADDRESS);
  
    // Get all token accounts by owner
    const tokenAccounts = await connection.getTokenAccountsByOwner(walletPublicKey, {
      mint: tokenMintAddress
    });
  
    // Print token account info
    tokenAccounts.value.forEach(tokenAccountInfo => {
      const accountData = AccountLayout.decode(tokenAccountInfo.account.data);
      console.log(`Token Account: ${tokenAccountInfo.pubkey.toBase58()}`);
      console.log(`Amount: ${accountData.amount}`);
    });
  }
  
  main().catch(err => {
    console.error(err);
  });
  