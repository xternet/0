const { BN, ether, expectRevert, balance, expectEvent, constants } = require('openzeppelin-test-helpers')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))

const { waitForEvent } = require('./helpers/utils')
const { expect } = require('chai')

const DS = artifacts.require('DS');
const Token = artifacts.require('Token');
const ERC20 = artifacts.require('openzeppelin-solidity/contracts/token/ERC20/ERC20');

contract('DS', function ([_, deployer, investor]) {
  const value = ether('0.1');
  const _name = '0';
  const _symbol = '0';
  const _decimals = new BN(18);
  const gasAmt = 3e6
  let expectedTokenAmount
  let newPrice

  describe('Test for getting price', () =>{
    beforeEach(async () => (
      { contract } = await DS.deployed(),
      { methods, events } = new web3.eth.Contract(
        contract._jsonInterface,
        contract._address
      )
    ))

    it('should log a new query', async () => {
      const {returnValues: {description}} = await waitForEvent(events.LogNewQuery)
      assert.strictEqual(description,
        'Provable query was sent, standing by for the answer...',
        'Provable query incorrectly logged!'
      )
    })

    it('should log a new price', async () => {
      const {returnValues: {price}} = await waitForEvent(events.LogNewTicket)
      newPrice = price
      console.log(`        The price is:   ${newPrice}`)
      assert.isAbove(parseFloat(price),0,'A price should have been retrieved from Provable call!')
    })

    it('should set price', async () => {
      const queriedPrice = await methods.price().call()
      assert.strictEqual(newPrice, queriedPrice, 'Contract\'s price not set correctly!')
    })  

    it('should log a failed query due to lack of funds', async () => {
      const { events } = await methods.update().send({from: _, gas: gasAmt})
      const description = events.LogNewQuery.returnValues.description
      assert.strictEqual(description,
        'Provable query was NOT sent, please add some ETH to cover for the query fee!',
        'Provable query incorrectly logged!')
    })
  })

  describe('Tests for: minterRole & nonMintable tokens & buying tokens & burning ether:', function () {

    beforeEach(async function () {
      this.token = await Token.new(_name, _symbol, _decimals, { from: deployer });
      this.ds = await DS.new(newPrice, this.token.address);
      await this.token.addMinter(this.ds.address, { from: deployer });
      await this.token.renounceMinter({ from: deployer });
    });

    describe('minter', function () {
      it('should be minter - ds', async function () {
        expect(await this.token.isMinter(this.ds.address)).to.equal(true);
      });

      it("shouldn't be minter - deployer", async function () {
        expect(await this.token.isMinter(deployer)).to.equal(false);
      });
    });

    describe('non-minter', function () {
        beforeEach(async function () {
          this.token = await ERC20.new();
          this.ds = await DS.new(newPrice, this.token.address);
        });

        it('should reject token purchase', async function () {
          await expectRevert.unspecified(this.ds.buyTokens({ value: value, from: investor }));     
        });
      });

    describe('buying tokens', function () {
      beforeEach(async function () {
        const result = await this.ds.price()
        expectedTokenAmount = await value.div(result);
        await this.ds.buyTokens({ value: value, from: investor });
      });

      it('should accept payments', async function () {
        await this.ds.send(value);
      });

      it('should log TokenPurchase', async function () {
        const { logs } = await this.ds.buyTokens({ value: value, from: investor });
        expectEvent.inLogs(logs, 'TokenPurchase', {
          investor: investor,
          amountWei: value,
          amountToken: expectedTokenAmount,
        });
      });

      it('should assign tokens to sender', async function () {
        expect(await this.token.balanceOf(investor)).to.be.bignumber.equal(expectedTokenAmount);
      });

      it('should increase totalSupply', async function () {
        expect(await this.token.totalSupply()).to.be.bignumber.equal(expectedTokenAmount);
      });
    });

    describe('burning Weis', function () {

      it('should log EtherBurned', async function () {
        const { logs } = await this.ds.buyTokens({ value: value, from: investor });
        expectEvent.inLogs(logs, 'EtherBurned', {
          investor: investor,
          amountWei: value,
        });
      });

      it('should burn Weis', async function () {
        const balanceTracker = await balance.tracker(constants.ZERO_ADDRESS);
        const receipt = await this.ds.buyTokens({ value: value, from: investor });
        const tx = await web3.eth.getTransaction(receipt.tx);
        const ganacheFault = ether('2');

        let gasUsed = receipt.receipt.gasUsed;
        let gasPrice = tx.gasPrice;

        const addition = new BN(gasUsed).mul(new BN(gasPrice)).add(ganacheFault);

        expect(await balanceTracker.delta()).to.be.bignumber.equal(value.add(addition));
      });

      it('should increase weiBurned', async function () {
          await this.ds.buyTokens({ value: value, from: investor });
          expect(await this.ds.weiBurned()).to.be.bignumber.equal(value);
      });
    });
  });
});
