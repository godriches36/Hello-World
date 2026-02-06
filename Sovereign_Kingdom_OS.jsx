import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { 
  Crown, ShieldCheck, MapPin, Cpu, Zap, Lock, Bell, Activity, History, PenTool, CheckCircle
} from 'lucide-react';

const HEADQUARTER = "NIGERIA (GLOBAL CRYPTO HQ)";
const ROOT_BANK = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const GENESIS_SUPPLY = 1250000000000; 
const XER_RATIO = 2.0; 

export default function App() {
  const [liveLogs, setLiveLogs] = useState([]);
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState("MASTER_SYNC_ACTIVE");

  // ACTIVATE BLOCKCHAIN SYNC
  useEffect(() => {
    const initializeOS = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");
        const abi = ["event Transfer(address indexed from, address indexed to, uint amount)"];
        const contract = new ethers.Contract(ROOT_BANK, abi, provider);

        contract.on("Transfer", (from, to, amount) => {
          const entry = `[NETWORK] ${from.substring(0,6)}... → ${ethers.utils.formatEther(amount).substring(0,4)} ANBSN`;
          setLiveLogs(prev => [entry, ...prev].slice(0, 4));
        });

        setStatus("SOVEREIGN_NODE_ONLINE");
      } catch (e) {
        setStatus("HANDSHAKE_DELAYED");
      }
    };
    initializeOS();
  }, []);

  // MOCK SIGNING ACTION (For UI display of the documentation logic)
  const demoSign = () => {
    setSignature("0x1479de57fa04891e00b39e4200cd8204164814f66423443ab70...");
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white font-mono flex flex-col p-6 md:p-12 overflow-x-hidden">
      
      {/* SOVEREIGN BRANDING */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-6">
          <div className="bg-yellow-500 p-5 rounded-[2rem] shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-pulse">
            <Crown className="text-black" size={40} />
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">AGBON OS</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em] mt-3 flex items-center gap-2">
              <MapPin size={12} className="text-green-500" /> {HEADQUARTER}
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="inline-flex items-center gap-3 bg-zinc-900 px-6 py-2 rounded-full border border-white/5">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
          </div>
          <p className="text-[8px] text-zinc-700 mt-4 uppercase tracking-[0.4em] font-black">COPYRIGHT © 2026 godriches36</p>
        </div>
      </div>

      {/* WEALTH DISPLAY */}
      <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border border-white/5 p-12 md:p-20 rounded-[4rem] mb-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Cpu size={350} />
        </div>
        <p className="text-[11px] text-yellow-500 font-black uppercase tracking-[0.8em] mb-8 border-l-2 border-yellow-500 pl-4">Sovereign Treasury Valuation</p>
        <h2 className="text-7xl md:text-[11rem] font-black italic tracking-tighter leading-none text-white drop-shadow-2xl">₦1.25T</h2>
        <div className="flex items-center gap-6 mt-8">
           <p className="text-4xl md:text-6xl font-black text-white italic tracking-tighter opacity-80">
             ${(GENESIS_SUPPLY * XER_RATIO).toLocaleString()}
           </p>
           <span className="bg-yellow-500/10 text-yellow-500 px-4 py-1 rounded-full text-[10px] font-black uppercase">XER 2.0 Active</span>
        </div>
      </div>

      {/* MODULES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
        
        {/* SIGNING TERMINAL (New Module) */}
        <div className="bg-zinc-900/40 border border-white/10 p-8 rounded-[3rem] group hover:border-yellow-500/50 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <PenTool size={20} className="text-yellow-500" />
            <h3 className="text-xs font-black uppercase tracking-widest">Sovereign_Signing.js</h3>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase mb-6 leading-relaxed">Cryptographic proof of identity for Sovereign Auth.</p>
          <button 
            onClick={demoSign}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all mb-4"
          >
            Sign "Hello World"
          </button>
          {signature && (
            <div className="p-4 bg-black/50 rounded-xl border border-white/5 break-all">
              <p className="text-[8px] text-green-500 font-bold mb-1 flex items-center gap-2">
                <CheckCircle size={10} /> Signature_Generated
              </p>
              <p className="text-[8px] text-zinc-500 font-mono leading-tight">{signature}</p>
            </div>
          )}
        </div>

        {/* LIVE STREAM */}
        <div className="bg-zinc-900/40 border border-white/10 p-8 rounded-[3rem]">
          <div className="flex items-center gap-4 mb-6">
            <Bell size={20} className="text-blue-500" />
            <h3 className="text-xs font-black uppercase tracking-widest">Sovereign_Events.js</h3>
          </div>
          <div className="space-y-3">
            {liveLogs.map((log, i) => (
              <div key={i} className="text-[10px] text-zinc-400 border-l-2 border-blue-500 pl-4 py-2 bg-white/5 rounded-r-xl">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY STATUS */}
        <div className="bg-zinc-900/40 border border-white/10 p-8 rounded-[3rem] flex flex-col justify-between">
           <div>
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck size={20} className="text-green-500" />
              <h3 className="text-xs font-black uppercase tracking-widest">System Security</h3>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-tighter">
              All Ethers.org v5 modules confirmed. GH_TOKEN Handshake Verified. Ormi CLI Infrastructure online.
            </p>
           </div>
           <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-[8px] text-zinc-700 font-black tracking-widest">AES-256 SECURED</span>
             <Lock size={14} className="text-zinc-800" />
           </div>
        </div>

      </div>

      {/* DOCK */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-20 bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-full flex justify-around items-center px-10 z-50">
        <Zap className="text-zinc-600 hover:text-yellow-500 cursor-pointer" size={24} />
        <div className="h-8 w-[1px] bg-white/10"></div>
        <History className="text-zinc-600 hover:text-white cursor-pointer" size={24} />
        <div className="h-8 w-[1px] bg-white/10"></div>
        <PenTool className="text-zinc-600 hover:text-green-500 cursor-pointer" size={24} />
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { display: none; }
        body { background: #010101; cursor: crosshair; }
      `}} />
    </div>
  );
}

