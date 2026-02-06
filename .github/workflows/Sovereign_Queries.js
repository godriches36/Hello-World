/**
 * AGBON OS - READ-ONLY METHODS
 * Logic: Querying the Blockchain (Circle 1)
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 */

import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");
const contractAddress = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

export const fetchSovereignBalance = async (address) => {
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18);
};

export const fetchContractMetadata = async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    return { name, symbol };
};
