import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from 'react';
import './App.css';
import Question from './Question';
import QuestionList from './QuestionList';
import NotFound from './NotFound';

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            answers: []
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.getAnswers = this.getAnswers.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    addQuestion(question) {
        fetch( `${this.API_URL}/questions`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new question:");
                console.log(json);
                this.getData();
            });
    }

    addAnswer(answer) {
        fetch(`${this.API_URL}/answers`, {
            method: 'POST',
            body: JSON.stringify(answer),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new answer:");
                console.log(json);
                this.getAnswers(answer.question_id);
            });
    }

    getAnswers(question_id) {
        fetch(`${this.API_URL}/answers/to/${question_id}`)
            .then(response => response.json())
            .then(json => {
                console.log("##");
                console.log(json);
                console.log("##");
                this.setState({
                    answers: json
                });
            });
        //console.log("### getAnswers(" + question_id + ") ###");
    }

    getData() {
        fetch(`${this.API_URL}/questions`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    questions: json
                })
            });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Link to={`/`}><h1>Herting's Q&A</h1></Link>
                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                   <QuestionList {...props}
                                                 questions={this.state.questions}
                                                 addQuestion={this.addQuestion}/>}
                        />

                        <Route exact path={'/question/:id'}
                               render={(props) =>
                                   <Question {...props}
                                             addAnswer={this.addAnswer}
                                             getAnswers={this.getAnswers}
                                             answers={this.state.answers}/>}
                        />

                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
