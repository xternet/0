pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";
import "./Token.sol";
import "./provableAPI.sol";

contract DS is ReentrancyGuard, usingProvable {
  using SafeMath for uint256;

  Token private _token;
  uint256 private _price;
  uint256 private _weiBurned;
  uint256 private _tokenAmount;
  uint256 private _tradeId;

  event TokenPurchase(address investor, uint256 amountWei, uint256 amountToken, uint256 id, uint256 price, uint256 timestamp);
  event EtherBurned(address investor, uint256 amountWei, uint256 timestamp);

  event LogNewQuery(string description);
  event LogNewTicket(uint256 price);

  constructor (uint256 price, Token token) public {
    require(price != 0);
    require(address(token) != address(0), "Decentralized Store: token is the zero address");

    _price = price;
    _token = token;

    provable_setProof(proofType_Android | proofStorage_IPFS);
    update();
  }

  function __callback(bytes32 _myid, string memory _result, bytes memory _proof) public {
    require(msg.sender == provable_cbAddress());
    update();

    _price = parseInt(_result);
    emit LogNewTicket(_price);
  }

  function update() public payable {
    if (provable_getPrice("URL") > address(this).balance) {
      emit LogNewQuery("Provable query was NOT sent, please add some ETH to cover for the query fee!");
    } else {
      emit LogNewQuery("Provable query was sent, standing by for the answer...");
      provable_query(600, "computation",["QmTGqAH6gqir17Qs7ARe1dcWWmQgSzXsZMZUCrG3Fv6WpR"]);
    }
  }

  function () external payable {
  }

  function token() public view returns (Token) {
    return _token;
  }

  function price() public view returns (uint256) {
    return _price;
  }

  function weiBurned() public view returns (uint256) {
    return _weiBurned;
  }

  function tradeId() public view returns (uint256) {
    return _tradeId;
  }

  function buyTokens() public nonReentrant payable {
    _preValidatePurchase(msg.sender, msg.value);

    _tokenAmount = _getTokenAmount(msg.value);

    _processPurchase(msg.sender, _tokenAmount);
    _tradeId = _tradeId.add(1);
    emit TokenPurchase(msg.sender, msg.value, _tokenAmount, _tradeId, _price, now);

    _burnEther();
    emit EtherBurned(msg.sender, msg.value, now);
  }

  function _preValidatePurchase(address investor, uint256 weiAmount) internal view {
    require(investor != address(0), "Decentralized Store: investor is the zero address");
    require(weiAmount != 0, "Decentralized Store: wei amount is 0");
  }

  function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
    return weiAmount.div(_price);
  }

  function _processPurchase(address investor, uint256 _tokenAmount) internal {
    require(
      Token(address(token())).mint(investor, _tokenAmount),
      "Decentralized Store: minting failed"
    );
  }

  function _burnEther() internal {
    address(0).transfer(msg.value);
    _weiBurned = _weiBurned.add(msg.value);
  }
}
