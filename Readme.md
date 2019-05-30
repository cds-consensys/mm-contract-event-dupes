This project is a dapp to demonstrate this [MetaMask issue](https://github.com/MetaMask/metamask-extension/issues/6668).

## Instructions

1. Clone the repo
    * `git clone git@github.com:cds-consensys/mm-contract-event-dupes.git`

1. Navigate to folder
    * `cd mm-contract-event-dupes`

1. Build truffle dependencies

    * `npm install` # from root folder

1. Start dev chain and migrate contracts
    * `truffle develop` # to start chain
    * `migrate` # to compile and deploy contracts

1. Start front end app
    * This should be done in a second terminal
      * `cd app`
      * `npm install`
      * `npm start`

1. Test in chrome with MetaMask extension and incognito mode, sans extensions

### Notes
1. Configure MetaMask to listen to localhost:9545 in order to use chain started
   by `truffle develop`
1. Seed the MetaMask account from the mnemonic logged from `truffle develop`
1. Nonce errors? Try resetting MetaMask account
