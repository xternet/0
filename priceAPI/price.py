import json
import requests
import statistics
import time

#URLs:
urlBitfinex = "https://api.bitfinex.com/v1/pubticker/ethusd"
urlCoinbase = "https://api.pro.coinbase.com/products/ETH-USD/ticker"
urlKraken = "https://api.kraken.com/0/public/Ticker?pair=ETHUSD"

#Variables:
ethInWei = 10**18
IT = 0.02
YS = 31557600
TS = 1577836800

#Formulas:
IS = IT/YS
SV = IS+1
TD = time.time()-TS
tokenInUsd = SV**TD

###############################################################
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

	#Get AVG ETH/USD
	prices = [priceCoinbase, priceKraken, priceBitfinex]
	avgEthUsd = statistics.median(prices)
	
	#Calc 0/ETH
	tokenInEth = float(tokenInUsd)/float(avgEthUsd)
	
	#Calc 0/Wei
	tokenInWei = tokenInEth * ethInWei

	print(int(tokenInWei))
###############################################################

calcPrice()
