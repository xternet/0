import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DSSelector, tokenSelector, web3Selector } from '../store/selectors'
import { 
  loadPruchaseInfo,
  subscribeToEvents,
  loadBurnedEtherX,
  loadTokenTotalSupply,
  updateNavbarInfo,
} from '../store/interactions'
import Trades from './Trades'
import MyTransactions from './MyTransactions'
import BuyTokens from './BuyTokens'

class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, ds, token, web3 } = props
    await loadPruchaseInfo(dispatch, ds)
    await subscribeToEvents(dispatch, ds)
    await loadBurnedEtherX(dispatch, ds)
    await loadTokenTotalSupply(dispatch, token)
    await updateNavbarInfo(dispatch, ds, token, web3)
  }

  render() {
    return (
      <div className="content">
        <div className="vertical-split">
            <MyTransactions />
          </div>
          <div className="vertical-split">
            <BuyTokens />
            </div>
          <div className="vertical-split">
            <Trades />
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    ds: DSSelector(state),
    web3: web3Selector(state)
  }
}

export default connect(mapStateToProps)(Content)

