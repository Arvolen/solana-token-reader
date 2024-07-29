const { Connection, PublicKey } = require('@solana/web3.js');
const { AccountLayout, u64 } = require('@solana/spl-token');

// Raydium USDC/USDT liquidity pool addresses
const POOL_ADDRESS = '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu';
const BASE_VAULT_ADDRESS = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R';
const QUOTE_VAULT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function getRaydiumLiquidityPoolInfo() {
  try {
    // Connect to the Solana mainnet cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    console.log(connection)
    // Get the base and quote vault addresses
    const baseVault = new PublicKey(BASE_VAULT_ADDRESS);
    const quoteVault = new PublicKey(QUOTE_VAULT_ADDRESS);

    // Fetch account info for the vaults
    const baseVaultInfo = await connection.getParsedAccountInfo(baseVault);
    const quoteVaultInfo = await connection.getParsedAccountInfo(quoteVault);

    if (baseVaultInfo.value === null || quoteVaultInfo.value === null) {
      throw new Error('Failed to find vault accounts');
    }

    // Extract token balances
    const baseTokenBalance = baseVaultInfo.value.data.parsed.info.tokenAmount;
    const quoteTokenBalance = quoteVaultInfo.value.data.parsed.info.tokenAmount;

    console.log(`Base Token (USDC) Balance: ${baseTokenBalance}`);
    console.log(`Quote Token (USDT) Balance: ${quoteTokenBalance}`);
  } catch (err) {
    console.error('Error fetching Raydium liquidity pool info:', err);
  }
}

getRaydiumLiquidityPoolInfo();
