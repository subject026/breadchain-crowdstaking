interface IToken {
  address: string;
  symbol: string;
  decimals: number;
}

export interface IConfig {
  [chainId: number]: ChainConfiguration;
}

export interface ChainConfiguration {
  NETWORK_STRING: string;
  ALCHEMY_API_KEY?: string;
  ALCHEMY_URL?: string;
  ETHERSCAN_API_KEY?: string;
  ETHERSCAN_URL?: string;
  DAI: IToken;
  DERIVATIVE: IToken;
  BREAD: IToken;
}
const config: IConfig = {
  // MAINNET: {
  //   NETWORK_STRING: "homestead",
  //   ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY?.toString(),
  //   ETHERSCAN_URL: "https://api.etherscan.io",
  //   CDAI: {
  //     address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
  //   },
  //   DAI: {
  //     symbol: "DAI",
  //     decimals: 18,
  //     address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //   },
  //   BREAD: {
  //     symbol: "BREAD",
  //     decimals: 18,
  //     address: "0xEd9265A05Fd6355061e1051c80450638EC84bff3",
  //   },
  // },
  137: {
    NETWORK_STRING: "polygon",
    ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY?.toString(),
    ALCHEMY_URL: "https://polygon-mainnet.g.alchemy.com/v2/",
    // CDAI: {
    //   address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    // },
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    DERIVATIVE: {
      symbol: "ADAI",
      decimals: 18,
      address: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
    },
  },
  80001: {
    NETWORK_STRING: "mumbai",
    ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY?.toString(),
    ALCHEMY_URL: "https://polygon-mumbai.g.alchemy.com/v2/",
    // CDAI: {
    //   address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    // },
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address:
        import.meta.env.DAI_ADDRESS?.toString() ||
        "0x9A753f0F7886C9fbF63cF59D0D4423C5eFaCE95B",
    },
    DERIVATIVE: {
      symbol: "ADAI",
      decimals: 18,
      address:
        import.meta.env.ADAI_ADDRESS?.toString() ||
        "0xDD4f3Ee61466C4158D394d57f3D4C397E91fBc51",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address:
        import.meta.env.BREAD_ADDRESS?.toString() ||
        "0x9AEe3dBCaC747bc41BcdFd94885fA6679151A931",
    },
  },
  4: {
    NETWORK_STRING: "rinkeby",
    ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY?.toString(),
    ETHERSCAN_URL: "https://api-rinkeby.etherscan.io",
    DERIVATIVE: {
      address: "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
      symbol: "CDAI",
      decimals: 8,
    },
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x115dA0Cc5Ffad0C0014963bd1fb3DF4cc8c36220",
    },
  },
};

export default config;
