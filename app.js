const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000
const getPayersTotalPoints = require('./mockapi/getPayerPoints');
const spendPoints = require('./mockapi/spendPoints');

let ledger = [];
let testExample = [
    { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
    { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
    { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
    { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
    { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" },
];

app.get('/', (req, res) => {
  res.send('Hello Fetch Rewards!')
})

/* Add transactions for a specific payer and date */
app.post('/addTransaction', (req, res) => {
    const name = req.query.name;
    const points = parseInt(req.query.points);

    if(name == null || points == null){
         res.send("Missing name or points query parameter");
         return;
    }


    const newEntry = {
        "payer": name,
        "points": points,
        "timestamp": new Date().toISOString()
    }

    ledger.push(newEntry);
    res.status(200)
    res.send("Added Transaction to Ledger");
});

/* spend X amount of points */
app.post('/spendPoints', (req, res) => {
    if(ledger.length === 0){
        res.send("No transactions in ledger")
    }

    let points = parseInt(req.query.points)
    const map = getPayersTotalPoints(ledger);

    if(points == null){
        res.send("Missing points query parameter");
        return;
   }
   

   //sort in ASC order oldest entries first
   ledger.sort((a,b) => {
       return a.timestamp.localeCompare(b.timestamp)
   });

   
   res.send(spendPoints(ledger, points, map));

});

app.get('/getBalances', (req, res) => {
    if(ledger.length === 0){
        res.send("No transactions in ledger")
    }
    res.send(getPayersTotalPoints(ledger));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})