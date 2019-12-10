import { 
	_loadWeb3, 
	_makeBuyTokens, 
	_loadAccount, 
	_loadToken, 
	_loadDS, 
	_loadPrice, 
	_loadPruchaseInfo, 
	_subscribeToEvents,
	_loadBurnedEtherX,
	_loadTokenTotalSupply,
	_updateNavbarInfo
 } from './interactionsHelpers'


export const loadWeb3 = (dispatch) => {
	return _loadWeb3(dispatch)
}

export const loadAccount = (web3, dispatch) => {
	return _loadAccount(web3, dispatch)
}

export const loadToken = (web3, networkId, dispatch) => {
	return _loadToken(web3, networkId, dispatch)
}

export const loadDS = (web3, networkId, dispatch) => {
	return _loadDS(web3, networkId, dispatch)
}

export const loadPrice = (dispatch, ds) => {
	return _loadPrice(dispatch, ds)
}

export const loadPruchaseInfo = (dispatch, ds) => {
	_loadPruchaseInfo(dispatch, ds)
}

export const subscribeToEvents = (dispatch, ds) => {
	_subscribeToEvents(dispatch, ds)
}

export const makeBuyTokens = (dispatch, web3, ds, tokens, account) => {
	_makeBuyTokens(dispatch, web3, ds, tokens, account)
}

export const loadBurnedEtherX = (dispatch, ds) => {
	_loadBurnedEtherX(dispatch, ds)
}

export const loadTokenTotalSupply = (dispatch, token) => {
	_loadTokenTotalSupply(dispatch, token)
}

export const updateNavbarInfo = (dispatch, ds, token, web3) => {
	_updateNavbarInfo(dispatch, ds, token, web3)
}