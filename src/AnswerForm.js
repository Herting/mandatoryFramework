import React, {Component} from 'react';

class AnswerForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            author: "",
            score: 0
        };

        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();

        let answer = {
            text: this.state.text,
            author: this.state.author,
            question_id: this.props.question_id,
            score: this.state.score
        };

        this.props.addAnswer(answer);
    }

    onChange(event) {
        let id = event.target.id;
        let value = event.target.value;

        if (id === "text") {
            this.setState({
                text: value
            })
        } else if (id === "author") {
            this.setState({
                author: value
            })
        }
    }

    render() {
        return <form method="post" action="#">
            <label htmlFor="text">Text</label>
            <textarea name="text" id="text" onChange={this.onChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" onChange={this.onChange}/>
            <button onClick={this.handleInput}
                    type="submit" id="submitItemBtn" className="btn btn-primary">ANSWER
            </button>
        </form>
            ;
    }
}

export default AnswerForm;
