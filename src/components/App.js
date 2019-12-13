import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import Content from './Content'
import { connect } from 'react-redux'
import { 
  loadWeb3, 
  loadAccount, 
  loadToken, 
  loadDS, 
  loadPrice,
   } from '../store/interactions'
import { contractsLoadedSelector } from '../store/selectors'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()


    await window.ethereum.enable()
    const x = await window.ethereum.enable()
    console.log('x: ', x)


    try{
      const y = await window.ethereum.enable()
      console.log('y: ', y)
    } catch (error){
      console.log('error: ', error)
    }
    
    await web3.eth.getAccounts()
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0]
    console.log('acc: ', account)
    await loadAccount(web3, dispatch)


    const ds = await loadDS(web3, networkId, dispatch)
    if(!ds) {
      window.alert('Decentralized Store smart contract not detected on the current network.\n\n\nConnect with your MetaMask to the Kovan Test Network.')
      return
    }

    await loadPrice(dispatch, ds)

    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      window.alert('Token smart contract not detected on the current network.')
      return
    }
}

  render() {
    return (
      <div>
          <Navbar />
          { this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state),
  }
}

export default connect(mapStateToProps)(App);
