export const GREEN = 'success'

export const DECIMALS = (10**18)

export const ether = wei => {
  if(wei) {
    return(wei / DECIMALS)
  }
}

export const tokenUSD = () =>{
  const TS = 1577836800
  const YS = 31557600
  const IT = 0.02
  let IS = IT/ YS
  let SV = IS + 1

    setInterval(function() {
      let TN = Math.floor(new Date().getTime()/1000.0)
      let TD = TN - TS;
      let costInUSD = SV**TD
      costInUSD = costInUSD.toFixed(10)
      const elem = document.getElementById("tokenUSD")

      if(typeof elem !== 'undefined' && elem !== null){
        document.getElementById("tokenUSD").innerHTML = "0/USD: " + costInUSD;
    } 
  }, 1000);
}

export const checkAccount = () => {
  setInterval(function() {
    window.ethereum.on('accountsChanged', function(accounts) {})
  }, 1000)
}

export const logInfo = () => {
  const elem = document.getElementById("logInfo")
  if(typeof elem !== 'undefined' && elem !== null){
    document.getElementById("logInfo").innerHTML = "Login MetaMask";
  } 
}

export const logError = () => {
  return(
    window.alert('         There was an error. Try:\n\n            go to MetaMask wallet\nSettings>Advanced>Restart Account\n\n                           or\n\n      download the newest version.\n')
  )
}

export const navInfo = (price, weiBurned, totalSupply) => {
  if(typeof totalSupply !== 'undefined')
  return(
    '0/ETH: ' + price +  '   ***   Burned ETH: ' + weiBurned + '   ***   Total Supply: ' + totalSupply
  )
}

export const redirect = () => {
  window.alert('In order to view DAPP add MetaMask extension to your browser')
  const mmWebsite = "https://metamask.io/"
  window.location.assign(mmWebsite)
}
