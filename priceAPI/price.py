import time
import requests
import json
import statistics

# URLs
urlCoinbase = "https://api.pro.coinbase.com/products/ETH-USD/ticker"
urlKraken = "https://api.kraken.com/0/public/Ticker?pair=ETHUSD"
urlBitfinex = "https://api.bitfinex.com/v1/pubticker/ethusd"

# Variables
SV = 1
AIT = 0.02
SSY = 31557600
TS = 1577836800
ethInWei = 10 ** 18


IPS = SV * (AIT/SSY)
TD = time.time() - TS
tokenInUsd = SV + (TD * IPS)

################################################################
def calcPrice():
	#Coinbase
	rCoinbase = requests.get(urlCoinbase)
	dCoinbase = rCoinbase.text
	jCoinbase = json.loads(dCoinbase)
	priceCoinbase = jCoinbase["price"]
	
	#Kraken
	rKraken = requests.get(urlKraken)
	dKraken = rKraken.text
	jKraken = json.loads(dKraken)
	priceKraken = jKraken["result"]["XETHZUSD"]["c"][0]

	#Bitfinex
	rBitfinex = requests.get(urlBitfinex)
	dBitfinex = rBitfinex.text
	jBitfinex = json.loads(dBitfinex)
	priceBitfinex = jBitfinex["mid"]

	#get AVG ETH/USD
	prices = [priceCoinbase, priceKraken, priceBitfinex]
	avgEthUsd = statistics.median(prices)
	
	#calc Token/ETH
	tokenInEth = float(tokenInUsd)/float(avgEthUsd)
	
	#calc Token/Wei
	tokenInWei = tokenInEth * ethInWei

	print(int(tokenInWei))
################################################################

calcPrice()
