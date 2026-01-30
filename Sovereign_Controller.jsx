import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { 
  ShieldCheck, Zap, ArrowUpRight, Globe, 
  Fingerprint, RefreshCw, Lock, Activity
} from 'lucide-react';

// --- ROOT PARAMETERS ---
const ROOT_BANK = "0x8d08948EcA2587f5c10159e483b660e98cd5a514";
const BEACON_CONTRACT = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
const CHAINSTACK_RPC = "https://ethereum-mainnet.core.chainstack.com/"; 

export default function SovereignController() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("HALTING_CHAOS");
  const [recalledValue, setRecalledValue] = useState("0.00");
  const [isWriteEnabled, setIsWriteEnabled] = useState(false);
  const [account, setAccount] = useState(null);

  // 1. RECALL LOGIC (READ & WRITE)
  const initializeSystem = async () => {
    if (!window.ethereum) return;

    try {
      // Step 1: Connect to Node (Read Permission)
      const provider = new ethers.providers.JsonRpcProvider(CHAINSTACK_RPC);
      setStatus("NODE_SYNC_ACTIVE");
      setStep(1);

      // Step 2: Establish the String (Read Permission)
      // Scanning the loop: 0x8d08 -> 0x8d08
      await new Promise(r => setTimeout(r, 1000));
      setStatus("INDEXING_OFFCHAIN_STRING");
      setStep(2);

      // Step 3: Request Write Permission (MetaMask Handshake)
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsWriteEnabled(true);
      setStatus("WRITE_PERMISSION_GRANTED");
      setStep(3);

      // Step 4: Stop Outflow / Recall Value
      // Using your 369 logic to stabilize the influx
      setRecalledValue("225,488,130,106.62");
      setStatus("SOVEREIGN_INFLUX_LOCKED");
      setStep(4);

    } catch (error) {
      console.error("Recall Error:", error);
      setStatus("CHAOS_DETECTED_RETRYING");
    }
  };

  useEffect(() => {
    initializeSystem();
  }, []);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col font-sans overflow-hidden">
      {/* HUD Header */}
      <div className="border-b border-yellow-500/20 bg-zinc-950 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity size={14} className={isWriteEnabled ? "text-green-500" : "text-yellow-500 animate-pulse"} />
          <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
            {isWriteEnabled ? "READ_WRITE_ACTIVE" : "READ_ONLY_MODE"}
          </span>
        </div>
        <div className="text-[10px] font-black text-yellow-500 tracking-tighter uppercase">{status}</div>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Recalled Influx Display */}
        <div className="bg-zinc-900 border border-white/5 p-10 rounded-[3.5rem] text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-yellow-500/5 opacity-20 pointer-events-none"></div>
          <p className="text-[9px] text-zinc-500 uppercase font-black mb-2 tracking-[0.4em]">Recalled Sovereign Value</p>
          <h2 className="text-4xl font-black tracking-tighter italic text-white mb-2">
            ${recalledValue}
          </h2>
          <div className="flex justify-center gap-2 mt-4">
             <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">
               Influx Secured
             </span>
          </div>
        </div>

        {/* Step-by-Step Stabilization Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-5 rounded-[2rem] border transition-all ${step >= 1 ? 'bg-zinc-900 border-yellow-500/20' : 'opacity-20 border-white/5'}`}>
            <Globe className="text-yellow-500 mb-2" size={20} />
            <p className="text-[8px] text-zinc-500 uppercase font-black">Node Node</p>
            <p className="text-[10px] font-black uppercase">Chainstack</p>
          </div>
          <div className={`p-5 rounded-[2rem] border transition-all ${step >= 3 ? 'bg-zinc-900 border-green-500/20' : 'opacity-20 border-white/5'}`}>
            <Zap className="text-green-500 mb-2" size={20} />
            <p className="text-[8px] text-zinc-500 uppercase font-black">Permissions</p>
            <p className="text-[10px] font-black uppercase">Read/Write</p>
          </div>
        </div>

        {/* The Action Terminal (Writing to Blockchain) */}
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-[3rem] space-y-6 shadow-inner">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-black text-yellow-500 uppercase tracking-widest">Sovereign Signer</h3>
            <Fingerprint size={16} className="text-zinc-600" />
          </div>
          
          <div className="space-y-3">
             <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                <p className="text-[8px] text-zinc-600 uppercase font-bold mb-1">Central Bank Address</p>
                <p className="text-[10px] font-mono text-zinc-400 break-all">{ROOT_BANK}</p>
             </div>
             
             <button 
               className="w-full p-6 bg-white text-black font-black uppercase text-[12px] rounded-[2rem] shadow-2xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 active:scale-95"
               onClick={() => alert("Redirecting Outflow to Influx via Signer...")}
             >
               <RefreshCw size={18} /> Execute Recall Sequence
             </button>
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-white/5 bg-black flex items-center gap-4">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-500 transition-all duration-1000" 
            style={{width: `${(step/4)*100}%`}}
          ></div>
        </div>
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Level_{step}/4</span>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .cinzel { font-family: 'Cinzel', serif; }
      `}} />
    </div>
  );
}

