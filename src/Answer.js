import React, {Component} from 'react';

class Answer extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            answer: props.answer
        };

        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
    }

    voteUp() {
        fetch(`${this.API_URL}/answers/voteup/` + this.state.answer.id, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new question:");
                console.log(json);
                this.props.getAnswers(this.state.answer.question_id);
                let oldAnswer = {...this.state.answer};
                oldAnswer.score = oldAnswer.score + 1;
                this.setState({
                    answer: oldAnswer
                })
            });
    }

    voteDown() {
        fetch(`${this.API_URL}/answers/votedown/` + this.state.answer.id, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new question:");
                console.log(json);
                this.props.getAnswers(this.state.answer.question_id);
                let oldAnswer = {...this.state.answer};
                oldAnswer.score = oldAnswer.score - 1;
                this.setState({
                    answer: oldAnswer
                })
            });
    }

    render() {
        let content = <p>Loading Answer...</p>;
        if (this.state.answer) {
            let answer = this.state.answer;
            content =
                <div className="answer">
                    <div className="voting noPadding">
                        <i onClick={this.voteUp} className="arrow up"/>
                        <span className="score">{answer.score}</span>
                        <i onClick={this.voteDown} className="arrow down"/>
                    </div>
                    <pre>{answer.text}<span className="date">{answer.created}</span><span
                        className="author">Answered by {answer.author}</span></pre>
                </div>
        }

        return content;
    }
}

export default Answer;
