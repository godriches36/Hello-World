export default {
  async fetch(request, env) {
    const INFURA_URL = `https://mainnet.infura.io/v3/${env.INFURA_ID}`;

    // 05Fa Protocol: Direct Handshake with the Blockchain
    const response = await fetch(INFURA_URL, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      }),
    });

    const data = await response.json();
    const blockNumber = parseInt(data.result, 16);

    // This is the 1% Logic controlling the output
    const body = {
      status: "SOVEREIGN_ACTIVE",
      protocol: "05Fa",
      architect: "0x8d08",
      frequency: "1.25T_NAIRA_INVERSION",
      live_block: blockNumber,
      message: "Agbon Kingdom Infrastructure: Online"
    };

    return new Response(JSON.stringify(body), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Allows ANBSN-OS to read this data
      },
    });
  },
};

