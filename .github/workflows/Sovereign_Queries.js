/**
 * AGBON OS - READ-ONLY BLOCKCHAIN INTERFACE
 * Documentation: https://docs.eth/#getting-started--querying
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

import { ethers } from "ethers";

// Using your Sovereign RPC from Secrets
const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");
const contractAddress = "0x8d08948eca2587f5c10159e483b660e98cd5a514";

const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

export const getSovereignData = async (address) => {
    // Get the ERC-20 token name
    const name = await contract.name();
    // Get the ERC-20 token symbol
    const symbol = await contract.symbol();
    // Get the balance of an address
    const balance = await contract.balanceOf(address);
    
    return {
        name,
        symbol,
        balance: ethers.utils.formatUnits(balance, 18)
    };
};
