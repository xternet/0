const { BN } = require('openzeppelin-test-helpers');
const Token = artifacts.require('./Token');

const { shouldBehaveLikeERC20Mintable } = require('./helpers/TokenMintable.behavior.js');
const { shouldBehaveLikePublicRole } = require('./helpers/PublicRole.behavior.js');

const { expect } = require('chai');

contract('Token', function ([_, minter, owner, otherMinter, ...otherAccounts]) {
  const _name = 'StoreOfValue';
  const _symbol = 'SOV';
  const _decimals = new BN(18);

  beforeEach(async function () {
    this.token = await Token.new(_name, _symbol, _decimals, { from: minter });
  });

  describe('Tests for: name & symbol & decimals', function () {
    it('has a name', async function () {
      expect(await this.token.name()).to.equal(_name);
    });

    it('has a symbol', async function () {
      expect(await this.token.symbol()).to.equal(_symbol);
    });

    it('has an amount of decimals', async function () {
      expect(await this.token.decimals()).to.be.bignumber.equal(_decimals);
    });
  });

  describe('Tests for: minter & non-minter roles:', function () {
    beforeEach(async function () {
      this.contract = this.token;
      await this.contract.addMinter(otherMinter, { from: minter });
    });

    shouldBehaveLikePublicRole(minter, otherMinter, otherAccounts, 'minter');
  });

  shouldBehaveLikeERC20Mintable(minter, otherAccounts);
});

// 