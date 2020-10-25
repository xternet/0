import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector, priceSelector, burnedEtherSelector, tokenTotalSupplySelector } from '../store/selectors'
import { DECIMALS, checkAccount, logInfo, navInfo} from '../helpers'
import { SpinDot } from './Spinner'

const navbarLogin = props => {
    return (
      <h5 text-important="true" id="logInfo"></h5>
    )    
}

const navbarAccount = props => {
  const { 
   account,
   string = `You are logged as: ${account.substring(0,6)}...${account.substring(38,42)}`,
  } = props
    return(
      <h5 text-important="true" id="checkAccount"></h5>,
      <h5 text-important="true" >{string}</h5>
    )
}

class Navbar extends Component {
  render() {
    return (
      <div className="hidenavbar">
        <nav >
        <h2 className="p2"></h2>
        <h1 className="p1">
          <a className="navbar-text text-monospace"> 
          {this.props.navInfoX ? this.props.navInfoX : <SpinDot />}
          </a>
          <li className="navbar-text text-monospace">
            {this.props.account ? navbarAccount(this.props) : navbarLogin(this.props)}
          </li>
        </h1>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const account = accountSelector(state)
  const price = priceSelector(state)
  const burnedEther = burnedEtherSelector(state)
  const totalSupply = tokenTotalSupplySelector(state)
  const navInfoX = navInfo((price/DECIMALS).toFixed(5), (burnedEther/DECIMALS).toFixed(5), totalSupply)

  return {
    account,
    price,
    burnedEther,
    totalSupply,
    checkAccount: checkAccount(state),
    logInfo: logInfo(state),
    navInfoX
  }
}

export default connect(mapStateToProps)(Navbar)