const Token = artifacts.require("./Token.sol")
const DS = artifacts.require("./DS.sol")

module.exports = async function(deployer) {
  const _name = '0';
  const _symbol = '0';
  const _decimals = 0;
  const _price = 1;

  await deployer.deploy(Token, _name, _symbol, _decimals);
  const _token = await Token.deployed()
  const _tokenAddress = await _token.address

  await deployer.deploy(DS, _price, _tokenAddress);
  const _ds = await DS.deployed()
  const _dsAddress = await _ds.address

  await _token.addMinter(_dsAddress)
}