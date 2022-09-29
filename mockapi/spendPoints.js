const spendPoints = (ledger, points, payerTotalPoints) => {
    let ledgerOfPeopleWhoSpentPoints = []
    ledger.forEach(transaction => {
        if(points === 0) {return;}

        //the transaction points is less than points but can take up some of it
        if(transaction.points < points && (payerTotalPoints[transaction.payer] - transaction.points) >= 0){
            points -= transaction.points;
            addPayerToLedger(ledgerOfPeopleWhoSpentPoints, transaction.payer, transaction.points)
        }
        //else if the transaction points is > points and we subtract the remainder
        else if(transaction.points > points && (payerTotalPoints[transaction.payer] - points) >= 0){
            transaction.points -= points
            addPayerToLedger(ledgerOfPeopleWhoSpentPoints, transaction.payer, points)
            points = 0;
        }
    })

   return ledgerOfPeopleWhoSpentPoints

}

const addPayerToLedger = (ledger, payer, points) =>{
    const existingEntry = ledger.find(person => person.payer === payer);
    if(existingEntry){
        existingEntry.points -= points;
    }
    else{
        const newEntry = {
            "payer": payer,
            "points" : -points
        }
        ledger.push(newEntry)
    }
}
module.exports = spendPoints;