/**
 * @title ANBSN Sovereign Node Verifier
 * @author 0.0.7 World Leader
 * @notice Tests the live connection between your Chainstack Dashboard and your Code.
 */

const { ethers } = require("ethers");
require('dotenv').config();

async function testChainstackLink() {
    // These must match exactly what you see on your Chainstack Dashboard picture
    const HTTPS_URL = process.env.SOVEREIGN_RPC;
    const WSS_URL = process.env.WSS_RPC;

    console.log("------------------------------------------");
    console.log("0.0.7 NODE VERIFICATION SEQUENCE");
    console.log("------------------------------------------");

    try {
        // 1. Test HTTPS Connection (The Foundation)
        const httpProvider = new ethers.providers.JsonRpcProvider(HTTPS_URL);
        const block = await httpProvider.getBlockNumber();
        console.log(`[HTTPS] SUCCESS: Connected to Block #${block}`);

        // 2. Test WSS Connection (The Depositcontract)
        const wssProvider = new ethers.providers.WebSocketProvider(WSS_URL);
        const network = await wssProvider.getNetwork();
        console.log(`[WSS] SUCCESS: Pulse detected on ${network.name}`);

        console.log("------------------------------------------");
        console.log("STATUS: THE GREEN HUB IS FULLY ANCHORED");
        console.log("RESULT: READY FOR 1 TRILLION NAIRA INJECTION");
        console.log("------------------------------------------");

        process.exit(0);
    } catch (error) {
        console.error("VERIFICATION FAILED: Check your Chainstack URLs in Secrets.");
        console.error(error.message);
        process.exit(1);
    }
}

testChainstackLink();
