import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import {
  filledTradesLoadedSelector,
  filledTradesSelector
} from '../store/selectors'

const showFilledTrades = filledTrades => {
  return(
    <tbody>
      { filledTrades.map((trade) => {
        return(
          <tr className={`trade-${trade.id}`} key={trade.id}>
            <td className="text-muted">{trade.formattedTimestamp}</td>
            <td>{trade.amountToken}</td>
            <td className={`text-${trade.tokenPriceClassETH}`}>{trade.tokenPriceETH}</td>
          </tr>
        )
      }) }
    </tbody>
  )
}

class Trades extends Component {
  render() {
    return (
      <div className="buy">
        <span className="border-dotted">
          <div className="card bg-transparent text-white">
            <div className="card-header">
              <p className="text-center">Trades History</p>
            </div>
            <div className="card-body">
              <table className="table table-transparent table-sm small text-white">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>PriceETH</th>
                  </tr>
                </thead>
                { this.props.filledTradesLoaded ? showFilledTrades(this.props.filledTrades) : <Spinner type="table" />}
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
    filledTradesLoaded: filledTradesLoadedSelector(state),
    filledTrades: filledTradesSelector(state),
  }
}

export default connect(mapStateToProps)(Trades)