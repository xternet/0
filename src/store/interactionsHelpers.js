import Web3 from 'web3'
import Token from '../abis/Token.json'
import DS from '../abis/DS.json'
import {
	web3Loaded,
	web3AccountLoaded,
	tokenLoaded,
	DSLoaded,
	priceLoaded,
	filledTradesLoaded,
	buyTokensMaking,
	purchaseMade,
	burnedEtherLoaded,
	tokenTotalSupplyLoaded
} from './actions'
import { logError, redirect} from '../helpers'


export const _loadWeb3 = dispatch => {
	if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
		const web3 = new Web3(window.web3.currentProvider || 'http://localhost:7545')
		dispatch(web3Loaded(web3))
		return web3
	} else {
		redirect();
	}
}

export const _loadAccount = async (web3, dispatch) => {
	await window.ethereum.enable()
	const accounts = await web3.eth.getAccounts()
	const account = await accounts[0]
	if(typeof account !== 'undefined'){
		dispatch(web3AccountLoaded(account))
		return account
	} else {
		window.alert('account is undefined')
	}
}

export const _loadToken = async (web3, networkId, dispatch) => {
	try {
		const token = web3.eth.Contract(Token.abi, Token.networks[networkId].address)
		dispatch(tokenLoaded(token))
		return token
	} catch (error) {
		console.log('Contract not deployed to the current network!')
		return null
	}
}

export const _loadDS = async (web3, networkId, dispatch) => {
	try {
		const ds = web3.eth.Contract(DS.abi, DS.networks[networkId].address)
		dispatch(DSLoaded(ds))
		return ds
	} catch (error) {
		console.log('Contract not deployed to the current network!')
		return null
	}
}

export const _loadPrice = async (dispatch, ds) => {
	try {
		const price = await ds.methods.price().call()
		dispatch(priceLoaded(price))
		return price
	} catch (error) {
		console.log('DS contract not deployed to the current network!')
		return null
	}
}

export const _loadBurnedEther = async (dispatch, ds) => {
	try {
		const burnedEther = await ds.methods.weiBurned().call()
		dispatch(burnedEtherLoaded(burnedEther))
		return burnedEther
	} catch (error) {
		console.log('DS contract not deployed to the current network!')
		return null
	}
}

export const _loadTokenTotalSupply = async (dispatch, token) => {
	try {
		const totalSupply = await token.methods.totalSupply().call()
		dispatch(tokenTotalSupplyLoaded(totalSupply))
		return totalSupply
	} catch(error) {
		console.log('Token contract not deployed to the current network!')
		return null
	}
}

export const _loadPruchaseInfo = async (dispatch, ds) => {
	const buyStream = await ds.getPastEvents('TokenPurchase', {fromBlock: 0, toBlock: 'latest'})
	const boughtTokens = buyStream.map((event) => event.returnValues)
	dispatch(filledTradesLoaded(boughtTokens))
}

export const _updateNavbarInfo = async (dispatch, ds, token, web3) => {
	let totalSupply0
	let burnedEther0
	let price0
	let account0

	setInterval(async function () {
		const price = await ds.methods.price().call()
		if(price0!==price){
			dispatch(priceLoaded(price))
			price0=price
		}

		const burnedEther = await ds.methods.weiBurned().call()
		if(burnedEther0!==burnedEther){
			dispatch(burnedEtherLoaded(burnedEther))
			burnedEther0=burnedEther
		}

		const totalSupply = await token.methods.totalSupply().call()
		if(totalSupply0!==totalSupply){
			dispatch(tokenTotalSupplyLoaded(totalSupply))
			totalSupply0=totalSupply
		}

		const accounts = await web3.eth.getAccounts()
		const account = await accounts[0]
		if(account0!==account){
			dispatch(web3AccountLoaded(account))
			account0=account
		}
	}, 1000)
}

export const _subscribeToEvents = async (dispatch, ds) => {
	ds.events.TokenPurchase({}, (error, event ) => {
		dispatch(purchaseMade(event.returnValues))
	})
}

export const _makeBuyTokens = async (dispatch, web3, ds, tokens, account) => {
	if(typeof account === 'undefined')
		window.alert('Login MetaMask')
	else {
		const price = await ds.methods.price.call()
		const tokenAmount = tokens.amount
		const accBalance = await web3.eth.getBalance(account)

		_validateMakeBuyTokens(dispatch, ds, account, price, tokenAmount, accBalance)		
	}
}

const _validateMakeBuyTokens = (dispatch, ds, account, price, tokenAmount, accBalance) => {
	/* global BigInt */
	if (tokenAmount % 1 !== 0) {
		window.alert('Type only positive integers')
	} else if (tokenAmount < 1) {
		window.alert('Min. value is 1')
	} else if (tokenAmount.includes('.')){
		window.alert("Type numbers without '.'")
	} else {
		const result = BigInt(BigInt(price) * BigInt(tokenAmount))
		if(result>accBalance){
			window.alert('Insufficient balance. Select less amount or fill your account with more ETH.')
		} else {
			ds.methods.buyTokens().send({value: result.toString(), from: account})
			.on('transactionHash', (hash) => {
				dispatch(buyTokensMaking())
			})
			.on('error', (error) => {
				if (error.message.includes("User denied transaction signature")){
					console.log('User has rejected transaction')
				} else {
					console.log(error)
					logError()
				}
			})
		}
	}
}