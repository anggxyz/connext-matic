const { connect } = require('@connext/client')
const { getFileStore } = require('@connext/store')
const { Wallet } = require('ethers')
const { alice, bob } = require('./config.json')

function getConnectionParams (
  rpc, 
  pvtKey
  ) {
  return ({
    ethProviderUrl: rpc,
    signer: new Wallet(pvtKey).privateKey,
    nodeUrl: "https://indra-mumbai.matic.today",
    store: getFileStore(),
    logLevel: 3
  })
}

async function connectToChannels() {
  const aliceMumbaiParams = getConnectionParams(
    'https://rpc-mumbai.matic.today',
    alice
  )
  const aliceGoerliParams = getConnectionParams(
    'https://goerli.infura.io/v3/9b2d88cc1db243a1acf9819af5f4302d',
    alice
  )
  // const bobGoerliParams = getConnectionParams(
  //   'https://goerli.infura.io/v3/9b2d88cc1db243a1acf9819af5f4302d',
  //   bob
  // )
  // const bobMumbaiParams = getConnectionParams(
  //   'https://rpc-mumbai.matic.today',
  //   bob
  // )
  return await Promise.all ([
    // connect(aliceMumbaiParams), 
    connect(aliceGoerliParams),
    // connect(bobGoerliParams),
    // connect(bobMumbaiParams)
  ])
}

module.exports = {
  connectToChannels
}
