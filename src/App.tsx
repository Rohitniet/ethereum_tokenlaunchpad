import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config/wagmi";
import LandingPage from "./components/LandingPage";
import LaunchTokenPage from "./components/LaunchTokenPage";

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "launch">(
    "landing"
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {currentPage === "landing" ? (
          <LandingPage onGetStarted={() => setCurrentPage("launch")} />
        ) : (
          <LaunchTokenPage onBack={() => setCurrentPage("landing")} />
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
