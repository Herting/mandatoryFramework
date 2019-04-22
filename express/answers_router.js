module.exports = () => {
    let express = require('express');
    let router = express.Router();
    let moment = require('moment-timezone');

    const mongoose = require('mongoose');

    let Answer = mongoose.model('Answer', {
        id: Number,
        text: String,
        author: String,
        created: String,
        question_id: Number,
        score: Number
    });

    /****** Routes *****/
    router.get('/', (req, res) => {
        Answer.find({}, (err, answers) => {
            res.send(answers);
        })
    });

    router.get('/:id', (req, res) => {
        Answer.findOne({id: req.params.id}, (err, answer) => {
            res.send(answer);
        })
    });

    router.get('/to/:question_id', (req, res) => {
        Answer.find({question_id: req.params.question_id}).exec(function (err, answers) {
            res.send(answers);
        })
    });

    router.post('/', (req, res) => {
        Answer.findOne({}).sort('-id').exec(function (err, answer) {
            let text = req.body.text;
            let author = req.body.author;
            let created = moment.tz(moment(), 'Europe/Copenhagen');
            let question_id = req.body.question_id;
            let id = 0;
            if (answer != undefined) {
                id = answer.id + 1;
            }

            let newAnswer = new Answer({
                id: id,
                text: text,
                author: author,
                created: created.format("DD/MM/YYYY HH:mm:ss"),
                question_id: question_id,
                score: 0
            });

            newAnswer.save((err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json({msg: `You have posted this data: ${req.body}`});
                }
            })
        })
    });

    router.put('/voteup/:id', (req, res) => {
        Answer.findOne({id: req.params.id}).exec(function (err, answer) {
            answer.score = answer.score + 1;

            answer.save();

            res.json({msg: `You have sent this id: ${answer.id}`});
        });
    });

    router.put('/votedown/:id', (req, res) => {
        Answer.findOne({id: req.params.id}).exec(function (err, answer) {
            answer.score = answer.score - 1;

            answer.save();

            res.json({msg: `You have sent this id: ${answer.id}`});
        });
    });

    router.put('/:id', (req, res) => {
        Answer.findOne({id: req.params.id}).exec(function (err, answer) {
            let text = req.body.text ? req.body.text : answer.text;
            let author = req.body.author ? req.body.author : answer.author;

            answer.text = text;
            answer.author = author;

            answer.save();

            res.json({msg: `You have sent this id: ${answer.id}`});
        })
    });

    return router;
};