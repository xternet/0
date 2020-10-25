import { combineReducers } from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    default:
      return state
  }
}

function token(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    default:
      return state
  }
}

function ds(state = {}, action) {
  switch (action.type) {
    case 'DS_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'FILLED_TRADES_LOADED':
      return { ...state, filledTrades: { loaded: true, data: action.filledTrades }}
    case 'BUY_TOKENS_AMOUNT_CHANGED':
      return { ...state, buyTokens: { ...state.buyTokens, amount: action.amount}}
    case 'BUY_TOKENS_MAKING':
      return { ...state, buyTokens: { ...state.buyTokens, amount: null, making: true}}
    case 'PURCHASE_MADE':
      return {
        ...state,
        buyTokens: false,
        filledTrades: {
          ...state.filledTrades,
          data: [
            ...state.filledTrades.data,
            action.trade
          ]
        }
      }
    default:
      return state
  }
}

function price(state = {}, action) {
  switch (action.type) {
    case 'PRICE_LOADED':
      return{ ...state, price: action.price}
    default:
      return state
  }
}

function burnedEther(state = {}, action) {
  switch (action.type) {
    case 'BURNED_ETHER_LOADED':
      return{ ...state, burnedEther: action.burnedEther}
    default:
      return state
  }
}

function tokenTotalSupply(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_TOTAL_SUPPLY':
      return { ...state, totalSupply: action.totalSupply}
    default:
      return state
  }
}


const rootReducer = combineReducers({
  web3,
  token,
  ds,
  price,
  burnedEther,
  tokenTotalSupply
})

export default rootReducer