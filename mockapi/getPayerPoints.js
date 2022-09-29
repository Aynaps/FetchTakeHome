const getPayersTotalPoints = (ledger) => {
    //add up all of player balances to one entry per player
    /*
        map = {
            "payer": points
        }
    */
        let map = {};  
        ledger.forEach(transaction => {
            if(map[transaction.payer]){
                map[transaction.payer] += transaction.points;
            }
            else{
                map[transaction.payer] = transaction.points;
            }
        });
    return map;
}

module.exports = getPayersTotalPoints;