import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import {
  myFilledTradesLoadedSelector,
  myFilledTradesSelector,
  accountSelector
} from '../store/selectors'

const showMyFilledTrades = props => {
  const { account, myFilledTrades } = props
  if(account)
  return(
    <tbody>
      { myFilledTrades.map((trade) => {
        return (
          <tr key={trade.id}>
            <td className="text-muted">{trade.formattedTimestamp}</td>
            <td className={`text-${trade.tradeTypeClass}`}>{trade.tradeSign}{trade.amountToken}</td>
            <td className={`text-${trade.tradeTypeClass}`}>{trade.tokenPriceETH}</td>
          </tr>
        )
      }) }
    </tbody>  
  )
}

class MyTransactions extends Component {
  render() {
    return (
      <div className="buy">
        <span className="border-dotted">
            <div className="card bg-transparent text-white">
              <div className="card-header">
               <p className="text-center">My Transactions</p>
              </div>
              <div className="card-body">
                <table className="table table-transparent table-sm small text-white">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  { this.props.showMyFilledTrades ? showMyFilledTrades(this.props) : <Spinner type="table"/>}
                </table>
              </div>
            </div>
          </span>
        </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    account: accountSelector(state),
    myFilledTrades: myFilledTradesSelector(state),
    showMyFilledTrades: myFilledTradesLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(MyTransactions);