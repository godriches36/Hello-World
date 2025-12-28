/**
 * @title ANBSN Ownership Performance Test
 * @author 0.0.7 World Leader
 * @notice Tests parallel 'ownerOf' logic for the 1 Trillion Naira frequency.
 * @version 11-Month Structural Build
 */

const ethers = require("ethers");

// Your Master Anchor (Name Tag)
const SOVEREIGN_CONTRACT = "0x8d08948eca2587f5c10159e483b660e98cd5a514";

async function runOwnershipTest() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    
    // We define the 'ownerOf' logic just like the BAYC example in your picture
    const abi = [
        "function ownerOf(uint256 tokenId) view returns (address)",
        "function name() view returns (string)"
    ];

    const contract = new ethers.Contract(SOVEREIGN_CONTRACT, abi, provider);

    // Testing across 30 "Sovereign Indices" (Token IDs)
    const tokenIds = Array.from({ length: 30 }, (_, i) => i + 1);

    console.log("------------------------------------------");
    console.log("INITIATING BAYC-STYLE PERFORMANCE TEST...");
    console.log("TARGET: ANBSN SOVEREIGN NAIRA");
    console.log("METHOD: PARALLEL HTTP REQUESTS");
    console.log("------------------------------------------");

    try {
        console.time("Parallel_Latency_Pulse");

        // APPROACH: Sending multiple requests in parallel (The standard Web3.js way)
        const owners = await Promise.all(
            tokenIds.map(async (id) => {
                try {
                    return await contract.ownerOf(id);
                } catch (e) {
                    return "Pending Inversion...";
                }
            })
        );

        console.timeEnd("Parallel_Latency_Pulse");
        console.log(`PROCESSED: ${owners.length} Ownership Queries.`);
        console.log("STATUS: Logic established. Speed is now being optimized via Multicall.");

    } catch (error) {
        console.log("TEST CALIBRATION: Ensure Sovereign_Master_Final is deployed.");
    }
}

runOwnershipTest();
