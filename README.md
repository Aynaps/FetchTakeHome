# FetchTakeHome
Take Home Exercise for Fetch Rewards  
Feel free to use any API testing tool or just plain cURLs

# How to run
1. Clone repo
2. Run `npm i`
3. Once packages have been installed `cd` into root directory and run `npm start` 
4. Open `localhost:3000`

# How to Use
1. They are the three routes as expected: `/addTransaction` `/spendPoints` and `/getBalances`  

#### /addTransaction
**Type:** POST  
**Parameters:** name: query, points: query  
If the name/points are null the endpoint will return 

#### /spendPoints  
**Type:** POST  
**Parameters:** points: query  
If the ledger is empty or points is null then the endpoint will have no effect  

#### /getBalances  
**Type:** GET  
**Parameters:** None  
This will check if the ledger is empty and notify that there are no transactions in ledger.  

