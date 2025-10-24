import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
 
  useWaitForTransactionReceipt,
 
  useWriteContract,
} from "wagmi";
import { Rocket, Wallet, LogOut, AlertCircle } from "lucide-react";
import {
  parseEventLogs,
 
  type ParseEventLogsReturnType,
 
} from "viem";

import { abi } from "../config/abi.ts";

import { config } from "../config/wagmi.ts";
import { getPublicClient } from "wagmi/actions";

interface LaunchTokenPageProps {
  onBack: () => void;
}


type TokenCreatedEvent = {
  eventName: "TokenCreated";
  args: {
    tokenAddress: `0x${string}`;
    owner: `0x${string}`;
    initialSupply: bigint;
  };
};

export default function LaunchTokenPage({ onBack }: LaunchTokenPageProps) {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [tokenaddress, setTokenaddress] = useState ("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [isLaunching, _setIsLaunching] = useState(false);
  const [error, setError] = useState("");

  const wallet = useAccount();
  const { data: txhash, writeContract } = useWriteContract();


    const publicclient = getPublicClient(config);
  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!tokenName || !tokenSymbol || !initialAmount) {
      setError("Please fill in all fields");
      return;
    }

    const amount = parseFloat(initialAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Initial amount must be a positive number");
      return;
    }

    try {
      console.log(tokenName, wallet.address);
      const amountBigInt = BigInt(Math.floor(Number(initialAmount)));

      await writeContract({
        address: "0x6fFCBf90066319724Edcd0a5F0f96276e93cFC7e" as `0x${string}`,
        abi: abi,
        functionName: "createtoken",
        args: [wallet.address, tokenName, tokenSymbol, amountBigInt],
      });

      console.log("await os herer" + txhash);
    } catch (e) {
      console.log(e);
    }
  };

  //@ts-ignore 
  // define type here



  // this is how we get blockhash 
    let res = useWaitForTransactionReceipt({ hash: txhash });


    async function getlogs(){


    const logs = await publicclient.getLogs({
      // address:"0x6fFCBf90066319724Edcd0a5F0f96276e93cFC7e",

      blockHash:res.data?.blockHash,
      
      event: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "initialSupply",
            type: "uint256",
          },
        ],
        name: "TokenCreated",
        type: "event",
      },
    });

    const decoded = parseEventLogs({
      abi,
      logs:logs,
    }) as ParseEventLogsReturnType;

    console.log(decoded)


    const tokenCreated = decoded.find(
      
  (log ) => log.eventName === "TokenCreated"  ) as unknown as  TokenCreatedEvent;

   console.log(tokenCreated)

    
    setTokenaddress(tokenCreated?.args.tokenAddress)

            }

            useEffect(()=>{
              getlogs()
            },[res.data?.blockHash])

 





  




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Rocket className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">TokenLaunch</span>
            </button>

            <div className="flex items-center gap-4">
              {isConnected ? (
                <>
                  <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                    <span className="text-slate-400 text-sm">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => connect({ connector: connectors[0] })}
                  className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold text-white mb-4">
                Launch Your Token
              </h1>
              <p className="text-xl text-slate-400">
                Fill in the details below to create your ERC-20 token
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
              {!isConnected && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-medium">
                      Wallet Not Connected
                    </p>
                    <p className="text-yellow-400/80 text-sm mt-1">
                      Please connect your wallet to launch a token
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLaunch} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Token Name
                  </label>
                  <input
                    type="text"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="e.g., My Amazing Token"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Token Symbol
                  </label>
                  <input
                    type="text"
                    value={tokenSymbol}
                    onChange={(e) =>
                      setTokenSymbol(e.target.value.toUpperCase())
                    }
                    placeholder="e.g., MAT"
                    maxLength={10}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Initial Amount to Mint
                  </label>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    placeholder="e.g., 1000000"
                    min="0"
                    step="any"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLaunching || !isConnected}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:transform-none shadow-xl shadow-cyan-500/25 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isLaunching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Launch Token
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-white font-medium mb-3">Token Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name:</span>
                    <span className="text-white font-medium">
                      {tokenName || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Symbol:</span>
                    <span className="text-white font-medium">
                      {tokenSymbol || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Initial Supply:</span>
                    <span className="text-white font-medium">
                      {initialAmount
                        ? parseFloat(initialAmount).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Token Address</span>
                    <span className="text-white font-medium">
                      {tokenaddress
                        ? tokenaddress
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )

}
