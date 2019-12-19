export function web3Loaded(connection) {
	return {
		type: 'WEB3_LOADED',
		connection
	}
}

export function web3AccountLoaded(account) {
	return {
		type: 'WEB3_ACCOUNT_LOADED',
		account
	}
}

export function tokenLoaded(contract) {
	return {
		type: 'TOKEN_LOADED',
		contract
	}
}

export function DSLoaded(contract) {
	return {
		type: 'DS_LOADED',
		contract
	}
}

export function filledTradesLoaded(filledTrades) {
	return {
		type: 'FILLED_TRADES_LOADED',
		filledTrades
	}
}

export function priceLoaded(price) {
	return {
		type: 'PRICE_LOADED',
		price
	}
}

export function currentPriceLoaded(currentPrice) {
	return {
		type: 'CURRENT_PRICE_LOADED',
		currentPrice
	}
}

export function buyTokensAmountChanged(amount) {
  return {
    type: 'BUY_TOKENS_AMOUNT_CHANGED',
    amount
  }
}

export function buyTokens(amount) {
	return {
		type: 'BUY_TOKENS',
		amount
	}
}

export function buyTokensMaking(price) {
	return {
		type: 'BUY_TOKENS_MAKING'
	}
}

export function purchaseMade(trade) {
	return {
		type: 'PURCHASE_MADE',
		trade
	}
}

export function burnedEtherLoaded(burnedEther) {
	return {
		type: 'BURNED_ETHER_LOADED',
		burnedEther
	}
}

export function tokenTotalSupplyLoaded(totalSupply) {
	return {
		type: 'TOKEN_TOTAL_SUPPLY',
		totalSupply
	}
}