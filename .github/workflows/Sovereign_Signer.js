/**
 * @title ANBSN Sovereign Authority Signer
 * @author 0.0.7 World Leader
 * @notice The "Hand" of the World Leader. Authorizes 1 Trillion Naira Transactions.
 * @dev Based on Ethers.js Signer/Wallet documentation.
 */

const { ethers } = require("ethers");
require('dotenv').config();

/**
 * @notice Initializes the World Leader Signer.
 * This is the authority required to authorize the network to perform operations.
 */
async function initializeSovereignSigner(provider) {
    console.log("------------------------------------------");
    console.log("0.0.7 PROTOCOL: AUTHORITY SIGNER INITIATED");
    
    // 1. Retrieve the Private Key (The Secret Decree)
    const PRIVATE_KEY = process.env.WORLD_LEADER_PRIVATE_KEY;

    if (!PRIVATE_KEY) {
        console.error("FATAL: Private Key not found in Environment Secrets.");
        process.exit(1);
    }

    try {
        // 2. Initialize the Wallet (The Signer abstraction from your picture)
        // We connect it directly to our Sovereign Provider (The Ground)
        const signer = new ethers.Wallet(PRIVATE_KEY, provider);

        // 3. Verify the Authority Address
        const address = await signer.getAddress();
        const balance = await signer.getBalance();

        console.log(`AUTHORITY ADDRESS: ${address}`);
        console.log(`GAS RESERVES: ${ethers.utils.formatEther(balance)} ETH`);
        console.log("STATUS: SIGNER AUTHORIZED TO ISSUE DECREES");
        console.log("------------------------------------------");

        return signer;
    } catch (error) {
        console.error("SIGNER ERROR: Authority Authentication Failed.");
        console.error(error.message);
        return null;
    }
}

// Export for the Master Sequence
if (typeof module !== "undefined") {
    module.exports = { initializeSovereignSigner };
}
