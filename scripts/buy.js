// Import kontraktow
const Token = artifacts.require("Token")
const DS = artifacts.require("DS")

// Czekanie sekundy
const wait = seconds => {
	const milliseconds = seconds * 1000
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
try {
	// Import adresow
	const accounts = await web3.eth.getAccounts()
	const user1 = accounts[0]
	const user2 = accounts[1]
	// Naprawa bledu liczenia duzych liczb
	const fault = 0.00000000000001

	// Przypisanie zmiennej kontraktu punktu zakupu
	const ds = await DS.deployed()
	// Uzyskanie ceny
	let price = await ds.price()
	let result

		// Kupno od 1 do 5 Tokenow przez user1
		for (let i = 1; i <= 5; i++) {
			result = (price * (i+fault))
			await ds.buyTokens({ value: result.toString(), from: user1 })
			await wait(1)
		}

		// Kupno od 5 do 1 Tokenow przez user1
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