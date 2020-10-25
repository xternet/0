// Script testing buying function via DApp

const Token = artifacts.require("Token")
const DS = artifacts.require("DS")

const wait = seconds => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
try {
  const accounts = await web3.eth.getAccounts()
  const user1 = accounts[0]
  const user2 = accounts[1]
  const fault = 0.000000000000000001

  const ds = await DS.deployed()
  let price = await ds.price()
  let result

    for (let i = 1; i <= 5; i++) {
      result = (price * (i+fault))
      await ds.buyTokens({ value: result.toString(), from: user1 })
      await wait(1)
    }

    for (let i = 5; i >= 1; i--) {
      result = (price * (i+fault))
      await ds.buyTokens({ value: result.toString(), from: user2 })
      await wait(1)
    }
  } catch(error) {
    console.log(error)
  }
  callback()
}
