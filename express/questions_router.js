module.exports = () => {
    let express = require('express');
    let router = express.Router();
    let moment = require('moment-timezone');

    const mongoose = require('mongoose');

    let Question = mongoose.model('Question', {
        id: Number,
        title: String,
        description: String,
        author: String,
        created: String
    });

    /****** Routes *****/
    router.get('/', (req, res) => {
        Question.find({}, (err, questions) => {
            res.send(questions);
        })
    });

    router.get('/:id', (req, res) => {
        Question.findOne({id: req.params.id}, (err, question) => {
            res.send(question);
        })
    });

    router.post('/', (req, res) => {
        Question.findOne({}).sort('-id').exec(function (err, question) {
            let title = req.body.title;
            let description = req.body.description;
            let author = req.body.author;
            let created = moment.tz(moment(), 'Europe/Copenhagen');
            let id = 0;
            if (question != undefined) {
                id = question.id + 1;
            }

            let newQuestion = new Question({
                id: id,
                title: title,
                description: description,
                author: author,
                created: created.format("DD/MM/YYYY HH:mm:ss")
            });

            newQuestion.save((err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json({msg: `You have posted this data: ${req.body}`});
                }
            })
        })
    });

    router.put('/:id', (req, res) => {
        Question.findOne({id: req.params.id}).exec(function (err, question) {
            let title = req.body.title ? req.body.title : question.title;
            let description = req.body.description ? req.body.description : question.description;
            let author = req.body.author ? req.body.author : question.author;

            question.title = title;
            question.description = description;
            question.author = author;

            question.save();

            res.json({msg: `You have sent this id: ${question.id}`});
        })
    });

    return router;
};