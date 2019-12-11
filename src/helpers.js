export const GREEN = 'success'

export const DECIMALS = (10**18)

export const ether = wei => {
	if(wei) {
		return(wei / DECIMALS)
	}
}

export const tokenUSD = () =>{
	const startTime = 1577836800
	const startValue = 1
	let avgInflation = 0.000000000633761756

  	setInterval(function() {
	  var time = Math.floor(new Date().getTime()/1000.0)
	  var timeDif = time - startTime;
	  let costInUSD = startValue + (timeDif * avgInflation)
	  costInUSD = costInUSD.toFixed(10)
	  const elem = document.getElementById("tokenUSD")

		if(typeof elem !== 'undefined' && elem !== null){
			document.getElementById("tokenUSD").innerHTML = "Token/USD: " + costInUSD;
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
		'Token/ETH: ' + price +  '   ***   Burned ETH: ' + weiBurned + '   ***   Token Total Supply: ' + totalSupply
	)
}

export const redirect = () => {
	window.alert('In order to view DAPP add MetaMask extension to your browser');
	const mmWebsite = "https://metamask.io/"
	window.location.assign(mmWebsite)
}