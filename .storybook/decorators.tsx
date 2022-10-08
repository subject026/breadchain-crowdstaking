import { Wallet } from "ethers";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Story } from "@storybook/react";

import { HashRouter, Route, Routes } from "react-router-dom";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.hardhat],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "http://localhost:8545",
        webSocket: "ws://localhost:8545",
      }),
    }),
  ]
);

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = (wallet: Wallet) =>
  createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      new MockConnector({
        chains,
        options: {
          signer: wallet,
          chainId: 31337,
        },
      }),
    ],
  });

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
  return (
    <WagmiConfig client={mockWagmiClient(wallet)}>
      <Story />
    </WagmiConfig>
  );
};

export const ReactRouterDecorator = (Story: Story) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </HashRouter>
  );
};
