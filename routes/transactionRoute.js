const moment = require("moment")
const { response } = require("express");

const express = require("express");

const Transaction = require('../models/Transcation');
const router = express.Router();



router.post('/add-transaction', async function (req, res) {
    try {
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send('Transaction Added successfully');
    } catch (error) {
        res.status(500).json(error)
    }
});


router.post('/edit-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);

        res.send('Transaction Updated successfully');
    } catch (error) {
        res.status(500).json(error)
    }
});


router.post('/delete-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndDelete({ _id: req.body.transactionId });

        res.send('Transaction Deleted successfully');
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/get-all-transaction', async (req, res) => {
    const { frequency, selectedRange, type } = req.body
    try {
        const transactions = await Transaction.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
                }
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                }
            }),

            userid: req.body.userid,
            ...(type !== 'all' && { type })
        });

        res.send(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});


module.exports = router
