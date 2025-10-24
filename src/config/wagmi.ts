import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";


export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/sCw5tWZgrHkwsTrbGMpwyIBLvzgfEccW"
    ),
  },
});
