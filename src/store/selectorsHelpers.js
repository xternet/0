import { get } from 'lodash'
import { ether, GREEN } from '../helpers'
import moment from 'moment'

export const account = state => get(state, 'web3.account')
export const web3 = state => get(state, 'web3.connection')
export const price = state => get(state, 'price.price')
export const tokenLoaded = state => get(state, 'token.loaded', false)
export const token = state => get(state, 'token.contract')
export const DSLoaded = state => get(state, 'ds.loaded', false)
export const ds = state => get(state, 'ds.contract')
export const filledTradesLoaded = state => get(state, 'ds.filledTrades.loaded', false)
export const filledTrades = state => get(state, 'ds.filledTrades.data', [])
export const buyTokens = state => get(state, 'ds.buyTokens', {})
export const burnedEther = state => get(state, 'burnedEther.burnedEther')
export const tokenTotalSupply = state => get(state, 'tokenTotalSupply.totalSupply')
export const decorateFilledTrades = trades => {
  let previousTrade = trades[0]
    return(
      trades.map((trade) => {
      trade = decorateTrade(trade)
      trade = decorateFilledTrade(trade, previousTrade)
      previousTrade = trade
      return trade
    })
  )
}

export const decorateTrade = trade => {
  let tokenPriceETH = trade.price
  let amountToken = trade.amountToken
  tokenPriceETH = ether(tokenPriceETH).toFixed(5)
 
  return({
    ...trade,
    amountToken,
    tokenPriceETH,
    formattedTimestamp: moment.unix(trade.timestamp).format('h:m:ss a Y/M/D')
  })
}

export const decorateFilledTrade = trade => {
  return({
    ...trade,
    tokenPriceClassETH: makeGreen(trade),
  })
}

const makeGreen = () => {
  return GREEN
}

export const decorateMyFilledTrades = (trades, account) => {
  return(
    trades.map((trade) => {
      trade = decorateTrade(trade)
      trade = decorateMyFilledTrade(trade, account)
      return(trade)
    })
  )
}

export const decorateMyFilledTrade = (trade, account) => {
  const tradeType = 'buy'

  return({
    ...trade,
    tradeType,
    tradeTypeClass: (GREEN),
    tradeSign: ('+')
  })
}