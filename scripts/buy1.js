// Import kontraktow
const Token = artifacts.require("Token")
const DS = artifacts.require("DS")

// Czekanie sekundy
const wait = seconds => {
	const milliseconds = seconds * 1000
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
/* global BigInt */
try {
	/* global BigInt */
	// Pobranie i przypisanie kont
	const accounts = await web3.eth.getAccounts()
	const user1 = accounts[0]
	const user2 = accounts[1]

	//Przypisanie kontraktu Tokena "0" zmiennej token
	const token = await Token.deployed()
	console.log('Token fetched', token.address)

	// Przypisanie kontraktu punktu zakupu zmiennej ds
	const ds = await DS.deployed()
	console.log('DS fetched', ds.address)
	let price = await ds.price()
	let result
	// Piec transakcji kupna uzytkowika 1. od 1 do 5 tokenow
		for (let i = 1; i <= 5; i++) {
			/* global BigInt */
			result = BigInt(BigInt(price) * BigInt(i))
			await ds.buyTokens({ value: result.toString(), from: user1 })
			console.log(`Made order from ${user1}`)
			// Odczekanie sekundy pomiedzy kazda transakcja
			await wait(1)
		}
	// Piec transakcji kupna uzytkowika 1. Od 5 do 1 tokena
		for (let i = 5; i >= 1; i--) {
			/* global BigInt */
			result = BigInt(BigInt(price) * BigInt(i))
			await ds.buyTokens({ value: result.toString(), from: user2 })
			console.log(`Made order from ${user2}`)
			// Odczekanie sekundy pomiedzy kazda transakcja
			await wait(1)
		}
	} catch(error) {
		console.log(error)
	}
	callback()
}