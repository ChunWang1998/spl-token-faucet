# spl-token-faucet

## requirement

1. Write a faucet function in TS/JS to airdrop a spl token to users on Solana
2. Input: user wallet address / spl token mint address / amount to airdrop
3. Output: tx id
4. anyone who invokes this function should be able to see his/her spl token balance changes
5. should only airdrop to one token account of the user

## run
```
npm install
node faucet.js
```

## note

useful reference:
requestAirdrop.js
transferSol.js ->CONNECTION.getBalance
getAccountInfo.js->CONNECTION.getAccountInfo
getTokenAccountBalance.js->CONNECTION.getTokenAccountBalance
getTokenList->?
getTokenAccountsByOwner.js->查詢owner擁有多少個token account

流程:
1. create mint token
2. create mint token account
3. mint some mint token in mint token account
4. transfer mint token from mint token account to recipient wallet address(ata)->(faucet function) 