import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  DSSelector,
  accountSelector,
  web3Selector,
  buyTokensSelector,
  priceSelector,
} from '../store/selectors'
import { 
	buyTokensAmountChanged
 } from '../store/actions'
import { makeBuyTokens } from '../store/interactions'
import { DECIMALS, tokenUSD } from '../helpers'

const showForm = props => {
  const {
    dispatch,
    ds,
    web3,
    account,
    buyTokens,
    showBuyTotal,
    price,
  } = props

  return(
      <Tabs defaultActiveKey="buy" className="bg-transparent mt-5">
        <Tab eventKey="buy" className="bg-transparent">
          <form onSubmit={(event) => {
            event.preventDefault()
            makeBuyTokens(dispatch, web3, ds, buyTokens, account)
          }}>
            <div className="form-group small">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm bg-transparent text-white"
                  placeholder="amount..."
    							onChange={(e) => dispatch( buyTokensAmountChanged( e.target.value ) )}
                  required
                />
              </div>
             </div>
            <button type="submit" className="btn btn-outline-success btn-block">Buy</button>
            { showBuyTotal ? <small><b>Total: { ((buyTokens.amount * price)/DECIMALS).toFixed(5)} ETH~</b></small> : null }
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p className="text-center" text-important="true" id="tokenUSD"></p>
          </form>
        </Tab>
      </Tabs>
  )
}

class BuyTokens extends Component {

  render() {
    return (
      <div className="buy">
        <span className="border-dotted">
          <div className="card bg-transparent text-white">
          <div className="card-body">
            <h2><p className="text-center">Buy</p></h2>
             <h2><p className="text-center">T0k€N$</p></h2>
                {this.props.showForm ? showForm(this.props) : <Spinner type="table"/>}
            </div>
          </div>
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const buyTokens = buyTokensSelector(state)
  let price = priceSelector(state)

  return {
    account: accountSelector(state),
    ds: DSSelector(state),
    web3: web3Selector(state),
    tokenUSD: tokenUSD(),
    buyTokens,
    price,
    showForm: !buyTokens.making,
    showBuyTotal: !buyTokens.value,
  }
}

export default connect(mapStateToProps)(BuyTokens)