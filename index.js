const express = require('express')
const bodyParser  = require('body-parser')
const app = express()
const port = 80
app.use(bodyParser.json())

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

app.post('/add', (req, res) => {
    if (!req.body.num1) {
        return res.status(404).send({ code: 404, message: "Number 1 Not found" })
    }
    if (!req.body.num2) {
        return res.status(404).send({ code: 404, message: "Number 2 Not found" })
    }
    if(!containsOnlyNumbers(req.body.num1)){
        return res.status(400).send({ code: 400, message: "Number 1 is not an integer" })
    }
    if(!containsOnlyNumbers(req.body.num2)){
        return res.status(400).send({ code: 400, message: "Number 2 is not an integer" })
    }
    const body = req.body;
    const sum = parseInt(body.num1) + parseInt(body.num2);
    return res.status(200).send({ message: "Success", data: { sum: sum } })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})