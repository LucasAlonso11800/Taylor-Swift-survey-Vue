const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

router.get('/', async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            error: 'Bad request'
        })
    }
});

router.post('/', async (req, res) => {
    const answer = new Answer({
        question: req.body.question,
        favourite: req.body.favourite,
        worst: req.body.worst,
        underrated: req.body.underrated,
        friday: req.body.friday,
        sunday: req.body.sunday,
    })
    try {
        await Answer.insertMany(answer)
        res.json('Saved')
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            error: 'Bad request'
        })
    }
});

module.exports = router;