import React, {Component} from 'react';
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";

class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: "",
            answers: []
        };

        //this.addAnswer = this.addAnswer.bind(this);
        //this.getAnswers = this.getAnswers.bind(this);

        fetch('http://localhost:8080/api/questions/' + props.match.params.id)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    question: json
                });

                this.props.getAnswers(props.match.params.id);
            }).catch(error => {
            console.log(error);
        });
    }

    /*getAnswers() {
        fetch('http://localhost:8080/api/answers/to/' + this.state.question.id)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    answers: json
                });
            });
    }*/

    /*addAnswer(answer) {
        console.log("ADDDED");
        console.log(answer);
        this.props.addAnswer(answer)
        //this.getAnswers();
    }*/

    render() {
        let list = [];
        this.props.answers.forEach((elm) => {
            list.push(
                <div className="noPadding" key={elm.id}>
                    <Answer getAnswers={this.props.getAnswers} answer={elm}/>
                </div>
            )
        });

        let content = <p>Loading Question...</p>;
        if (this.state.question) {
            let question = this.state.question;
            content =
                <div className="noPadding">
                    <div className="fullQuestion">
                        <h2>{question.title}</h2>
                        <span className="date">{question.created}</span>
                        <pre>{question.description}<span className="author">Asked by {question.author}</span></pre>
                    </div>
                    <AnswerForm question_id={this.state.question.id} addAnswer={this.props.addAnswer}/>
                    <div className="noPadding">
                        {list}
                    </div>
                </div>
        }

        return content;
    }
}

export default Question;
