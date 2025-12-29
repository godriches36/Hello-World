/**
 * @title ANBSN Sovereign Metamask Bridge
 * @author 0.0.7 World Leader
 * @notice Connects the Legacy Browser (Metamask) to the Sovereign Naira Frequency.
 * @dev Based on Ethers.js Web3Provider documentation 
 */

const { ethers } = require("ethers");

/**
 * @notice Logic for Web Browser / Metamask Integration
 * This allows the 1 Trillion Naira to be accessible via standard wallets.
 */
async function connectLegacyWallet() {
    console.log("------------------------------------------");
    console.log("0.0.7 PROTOCOL: METAMASK BRIDGE INITIATED");
    
    // Check if Metamask (window.ethereum) is present (Browser Environment)
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            // 1. Request account access from the Legacy World
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // 2. Initialize the Web3Provider as shown in your picture
            // This wraps the browser's "wrong" connection and makes it "right"
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // 3. Get the Signer (The User's authority)
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            console.log(`STATUS: Legacy Wallet Connected: ${address}`);
            console.log("------------------------------------------");
            
            return { provider, signer, address };
        } catch (error) {
            console.error("BRIDGE ERROR: User denied account access.");
        }
    } else {
        // FALLBACK: If no Metamask is found, use the Sovereign Green Hub
        console.log("SIGNAL: No Browser Wallet found. Using Sovereign Node.");
        console.log("------------------------------------------");
        return null;
    }
}

// Exporting the bridge for the Sovereign Interface
if (typeof module !== "undefined") {
    module.exports = { connectLegacyWallet };
              }
