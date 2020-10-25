pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "./TokenMinterRole.sol";

contract Token is ERC20Detailed, ERC20Mintable, TokenMinterRole {
  constructor(string memory name, string memory symbol, uint8 decimals) 
  public
  ERC20Detailed(name, symbol, decimals)
  {
  }
}


