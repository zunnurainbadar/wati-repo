const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Summing = require('./summing.model')
const sum  = require("./sum")
const port = 80
const app = express()
app.use(cors())
app.use(bodyParser.json())

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wati');
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

app.post('/add', async (req, res) => {
    if (!req.body.num1) {
        return res.status(404).send({ code: 404, message: "Error", data: { }, error: "Number 1 Not found" })
    }
    if (!req.body.num2) {
        return res.status(404).send({ code: 404, message: "Error", data: {  }, error: "Number 2 Not found" })
    }
    if (!containsOnlyNumbers(req.body.num1)) {
        return res.status(400).send({ code: 400, message: "Error", data: {  }, error: "Number 1 is not an integer" })
    }
    if (!containsOnlyNumbers(req.body.num2)) {
        return res.status(400).send({ code: 400, message: "Error", data: {  }, error: "Number 2 is not an integer" })
    }
    const body = req.body;
    const result = sum(body.num1,body.num2)
    const summingResult = new Summing({ num1: body.num1, num2: body.num2, sum: result});
    await summingResult.save();

    return res.status(200).send({ code: 200, message: "Success", data: { sum: result }, error: null })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})