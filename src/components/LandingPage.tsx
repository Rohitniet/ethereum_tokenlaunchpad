import { Rocket, Zap, Shield, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">TokenLaunch</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
            >
              Launch App
            </button>
          </div>
        </nav>

        <main className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Launch Your Token in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Seconds, Not Hours
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              The fastest and most secure way to create and deploy your ERC-20
              tokens on Ethereum. No coding required, just connect your wallet
              and launch.
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg rounded-lg transition-all transform hover:scale-105 font-semibold shadow-xl shadow-cyan-500/25"
            >
              Get Started Now
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Deploy your token in under a minute. No complex setup, no
                technical knowledge needed.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure & Audited
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Built on battle-tested smart contracts. Your tokens are safe and
                compliant.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Production Ready
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Launch with confidence. Full ERC-20 standard compliance out of
                the box.
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  1
                </div>
                <h4 className="text-white font-semibold">Connect Wallet</h4>
                <p className="text-slate-400 text-sm">
                  Link your Web3 wallet securely
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  2
                </div>
                <h4 className="text-white font-semibold">Configure Token</h4>
                <p className="text-slate-400 text-sm">
                  Set name, symbol, and supply
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                  3
                </div>
                <h4 className="text-white font-semibold">Deploy & Launch</h4>
                <p className="text-slate-400 text-sm">
                  Your token goes live instantly
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="container mx-auto px-6 py-8 mt-20 border-t border-slate-800">
          <div className="text-center text-slate-500 text-sm">
            © 2025 TokenLaunch. Built with Wagmi and Ethereum.
          </div>
        </footer>
      </div>
    </div>
  );
}
