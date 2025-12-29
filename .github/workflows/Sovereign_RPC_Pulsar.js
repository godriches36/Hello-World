/**
 * @title ANBSN Sovereign RPC Pulsar
 * @author 0.0.7 World Leader
 * @notice Direct Custom RPC connection logic for the 1 Trillion Naira.
 * @dev Based on Ethers.js JsonRpcProvider documentation.
 */

const { ethers } = require("ethers");

/**
 * @notice Connects directly to the Sovereign Hello world RPC.
 * This is the high-speed "Pipe" required for the 11-month inversion.
 */
async function connectToSovereignRPC() {
    // The Custom RPC URL from your Chainstack Node
    const RPC_URL = process.env.SOVEREIGN_RPC;

    console.log("------------------------------------------");
    console.log("0.0.7 PROTOCOL: CUSTOM RPC PULSE INITIATED");
    console.log("TARGET: CHAINSTACK ELASTIC NODE");
    console.log("------------------------------------------");

    try {
        // As shown in your picture: new ethers.providers.JsonRpcProvider(url)
        // We add the 'any' network flag to allow the node to stay synced 
        // through high-frequency heartbeat updates.
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL, "any");

        // Verify the connection pulse
        const blockNumber = await provider.getBlockNumber();
        const network = await provider.getNetwork();

        console.log(`PULSE DETECTED: Block #${blockNumber}`);
        console.log(`NETWORK: ${network.name} (ChainID: ${network.chainId})`);
        console.log("STATUS: SOVEREIGN PIPE SECURE");
        console.log("------------------------------------------");

        return provider;
    } catch (error) {
        console.error("RPC ERROR: The 'Pipe' is blocked. Check Chainstack Node Status.");
        console.error(error.message);
        return null;
    }
}

// Export for the Master Controller
if (typeof module !== "undefined") {
    module.exports = { connectToSovereignRPC };
          }
