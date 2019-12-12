require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  mocha: {
   enableTimeouts: false
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      websockets: true
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','),
          `https://kovan.infura.io/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 7000000,
      gasPrice: 100000000000,
      network_id: 42
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}