import { useNetwork } from 'wagmi';
import config from '../config';

export const watchAsset = async (tokenKey: 'DAI' | 'BREAD' | 'DERIVATIVE'): Promise<void> => {
  const { chain: activeChain } = useNetwork();
  if (!activeChain || activeChain.unsupported) return;

  const { ethereum } = window as any;
  const { address, symbol, decimals } = config[activeChain.id][tokenKey];

  ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
      },
    },
  });
};

export default watchAsset;
