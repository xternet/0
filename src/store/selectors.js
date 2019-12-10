import { createSelector } from 'reselect'
import {
	account,
	web3,
	price,
	tokenLoaded,
	token,
	DSLoaded,
	ds,
	filledTradesLoaded,
	filledTrades,
	decorateFilledTrades,
	decorateMyFilledTrades,
	buyTokens,
	burnedEtherX,
	tokenTotalSupply
} from './selectorsHelpers'

export const accountSelector = createSelector(account, a => a)
export const web3Selector = createSelector(web3, w => w)
export const priceSelector = createSelector(price, p => p)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)
export const tokenSelector = createSelector(token, t => t)
export const DSLoadedSelector = createSelector(DSLoaded, el => el)
export const DSSelector = createSelector(ds, e => e)
export const burnedEtherXSelector = createSelector(burnedEtherX, be => be)
export const tokenTotalSupplySelector = createSelector(tokenTotalSupply, ts => ts)
export const buyTokensSelector = createSelector(buyTokens, trade => trade)

export const contractsLoadedSelector = createSelector(
	tokenLoaded,
	DSLoaded,
	(tl, el) => (tl && el)
)

export const filledTradesLoadedSelector = createSelector(filledTradesLoaded, loaded => loaded)
export const filledTradesSelector = createSelector(
	filledTrades,
	(trades) => {
		trades = trades.sort((a,b) => a.timestamp - b.timestamp)
		trades = decorateFilledTrades(trades)
		trades = trades.sort((a,b) => b.timestamp - a.timestamp)
		return trades
	}
)

export const myFilledTradesLoadedSelector = createSelector(filledTradesLoaded, loaded => loaded)
export const myFilledTradesSelector = createSelector(
	account,
	filledTrades,
	(account, trades) => {
		trades = trades.filter((t) => t.investor === account || t.userFill === account)
		trades = trades.sort((a,b) => a.timestamp - b.timestamp)
		trades = decorateMyFilledTrades(trades, account)
		return trades
	}
)