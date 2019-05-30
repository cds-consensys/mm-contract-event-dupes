This repo is to reproduce a MetaMask issue.

## Instructions

1. clone the repo

1. `npm install` # from root folder

1. Start dev chain
    * `truffle develop` # to start chain
    * `migrate` # to compile and deploy contracts

1. start front end client
    * `cd app`
    * `npm install`
    * `npm start`

1. Test in chrome with MetaMask extension and incognito mode, sans extensions

**Note**: Make sure to set MetaMask extension to localhost:9545 to use the
local chain started by `truffle develop`
