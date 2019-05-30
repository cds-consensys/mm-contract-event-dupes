import Web3 from "web3";
import SimpleStorage from './contracts/SimpleStorage'
import DimpleStorage from './contracts/DimpleStorage'
import FimpleStorage from './contracts/FimpleStorage'

const ul = document.querySelector('#events')

const appendToEventsList = msg => {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(msg))
  ul.appendChild(li)
}
const fallbackUrl = 'ws://127.0.0.1:9545'


const getWeb3FromEthereum = async () => {
  console.group("Is MetaMask injected?");
  const { ethereum } = window;
  if (!ethereum) {
    console.log('MetaMask Provider not detected')
    console.groupEnd()
    return
  }

  let web3 = new Web3(ethereum);
  await ethereum.enable();
  console.log('YES!')
  console.groupEnd()
  return web3

}

const getWeb3 = async() => {
  console.group('Resolve web3 provider')
  let web3 = await getWeb3FromEthereum()

  if (!web3) {
    const provider = new Web3.providers.WebsocketProvider(fallbackUrl)
    web3 = new Web3(provider)
  }
  console.groupEnd()
  return web3
}

const getAccounts = async web3 => {
  let accounts = await web3.eth.getAccounts()
  if (!accounts) {
    throw 'No accounts found!'
  }
  return accounts
}

const loadWeb3Contract = (web3, artifact, networkId, accounts) =>
  new web3.eth.Contract(
    artifact.abi,
    artifact.networks[networkId].address,
    {
      from: accounts[0],
      data: artifact.deployedBytecode
    }
  )

const registerWeb3ContractEvent = (contract, event) => {
  let counter = 0
  return contract.events[event]({}, (error, evt) => {
    if (!error) {
      const msg = `${event} fired ${++counter} times`
      appendToEventsList(msg)
      console.group(msg)
      console.log('event', evt)
      console.groupCollapsed('stack trace')
      console.trace()
      console.groupEnd()
      console.groupEnd()
    }
  })
}


const registerEvents = (web3, networkId, accounts) => {

  console.groupCollapsed('web3 connection details')
  console.log('web3', web3)
  console.log('networkId', networkId)
  console.log('accounts', accounts[0])
  console.groupEnd()

  const ssContract = loadWeb3Contract(web3, SimpleStorage, networkId, accounts)
  const dsContract = loadWeb3Contract(web3, DimpleStorage, networkId, accounts)
  const fsContract = loadWeb3Contract(web3, FimpleStorage, networkId, accounts)

  console.group('Load contracts from web3')
  console.log('SimpleStorage retrieved by address')
  console.log('DimpleStorage retrieved by address')
  console.log('FimpleStorage retrieved by address')

  console.groupCollapsed('Contract details')
  console.log('SimpleStorage', ssContract)
  console.log('DimpleStorage', dsContract)
  console.log('FimpleStorage', fsContract)
  console.groupEnd()

  console.groupEnd()

  registerWeb3ContractEvent(ssContract, 'SimpleSet')
  registerWeb3ContractEvent(dsContract, 'DimpleSet')
  // two events for FimpleStorage
  registerWeb3ContractEvent(fsContract, 'FimpleSet')
  registerWeb3ContractEvent(fsContract, 'FimpleSet2')

  document
    .querySelector('#simpleStorage')
    .onclick = () => ssContract.methods.set(42).send({from: accounts[0]})

  document
    .querySelector('#dimpleStorage')
    .onclick = () => dsContract.methods.set(108).send({from: accounts[0]})

  document
    .querySelector('#fimpleStorage')
    .onclick = () => fsContract.methods.set(369).send({from: accounts[0]})

  console.group('register contract events')
  console.log('listen for SimpleStorage::StorageSet events')
  console.log('listen for DimpleStorage::DimpleSet events')
  console.log('listen for FimpleStorage::FimpleSet events')
  console.log('listen for FimpleStorage::FimpleSet2 events')
  console.groupEnd()

}

document.addEventListener("DOMContentLoaded", async () => {
  const web3 = await getWeb3();
  const accounts = await getAccounts(web3)

  registerEvents(web3, 5777, accounts)
});
