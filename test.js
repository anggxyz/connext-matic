/**
 * Alice deposits some funds on her channel on Mumbai's node
 * Makes a simple end-to-end transfer from one user’s balance to another
 */
const { connectToChannels } = require('./channel.js')
const { alice, bob, amountInWei } = require('./config.json')
const { Wallet, providers, utils } = require('ethers')

// add delay
function wait (delayms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delayms)
  })
}

// display balance on node and chains
async function getBalances(pvtKey, channel) {
  let wallet = new Wallet(pvtKey)
  console.log ('---\ndisplaying balances for:', wallet.address, '\n---')
  console.log ('public identifier:', channel.publicIdentifier)
  let freeBalance = await channel.getFreeBalance()
  if (freeBalance[wallet.address]) {
    console.log (
      'Node:', 
      utils.formatEther(freeBalance[wallet.address])
    )
  }
  let mumbaiProvider = new providers.JsonRpcProvider ('https://rpc-mumbai.matic.today')
  let goerliProvider = new providers.JsonRpcProvider ('https://goerli.infura.io/v3/f3ffe28620114fd2bd00c5a3ebe55558')
  let onMumbai = wallet.connect(mumbaiProvider)
  let onGoerli = wallet.connect(goerliProvider)
  let balanceOnMumbai = await onMumbai.getBalance()
  console.log (
    'Mumbai chain:',
    utils.formatEther(balanceOnMumbai)
  )
  let balanceOnGoerli = await onGoerli.getBalance()
  console.log (
    'Goerli chain', 
    utils.formatEther(balanceOnGoerli.toString())
  )
  console.log ('---\n')
}

async function main () {

  // instantiate channel
  console.log ('connecting to channels...')
  let c = await connectToChannels ()
  let aliceChannel = {
    mumbai: c[0], // channel
    // goerli: c[1],
    address: c[0].signerAddress // adderss
  }
  // let bobChannel = {
  //   goerli: c[2], // channel
  //   mumbai: c[3],
  //   address: c[2].signerAddress // address
  // }
  console.log ('✨ channels instantiated!')
  
  // display balances
  // console.log ('\n---balances---\n')
  // console.log (`Alice's channel on Mumbai`)
  // await getBalances (alice, aliceChannel.mumbai)
  // console.log (`Alice's channel on Goerli`)
  // await getBalances (alice, aliceChannel.goerli)
  
  // // deposit to channel
  // // console.log ('---depositing---\n')
  // const payload = {
  //   amount: amountInWei, // in Wei
  //   assetId: "0x0000000000000000000000000000000000000000", // represents ETH
  // }
  // console.log ('depositing', utils.formatEther(payload.amount), 'from Alice on Mumbai')
  // let d = await aliceChannel.mumbai.deposit(payload)
  // console.log ('deposit result =>', d.transaction.hash)  
  // console.log ('---\n')

  // // display balances
  // await wait(7000) // wait 5 sec for the balances to update
  // console.log ('\n---balances---\n')
  // console.log (`Alice's channel on Mumbai`)
  // await getBalances (alice, aliceChannel.mumbai)
  // console.log (`Alice's channel on Goerli`)
  // await getBalances (alice, aliceChannel.goerli)

  // // withdraw from mumbai
  // console.log ('---withdrawing---\n')
  // console.log ('withdrawing', utils.formatEther(payload.amount), 'from Alice onto Goerli')
  // let w = await aliceChannel.goerli.withdraw({
  //   amount: amountInWei,
  //   assetId: "0x0000000000000000000000000000000000000000"
  // })

  // console.log ('withdraw =>', w)

  // // display balances
  // await wait(7000) // wait 5 sec for the balances to update
  // console.log ('\n---balances---\n')
  // console.log (`Alice's channel on Mumbai`)
  // await getBalances (alice, aliceChannel.mumbai)
  // console.log (`Alice's channel on Goerli`)
  // await getBalances (alice, aliceChannel.goerli)

}

main ()
