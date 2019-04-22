import React, {Component} from 'react';

class QuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            author: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();

        let question = {
            title: this.state.title,
            description: this.state.description,
            author: this.state.author
        };

        this.props.addQuestion(question);
    }

    onChange(event) {
        let id = event.target.id;
        let value = event.target.value;
        //console.log(id);

        if (id === "title") {
            this.setState({
                title: value
            })
        } else if (id === "description") {
            this.setState({
                description: value
            })
        } else if (id === "author") {
            this.setState({
                author: value
            })
        }
    }

    render() {
        return <form method="post" action="#">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={this.onChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" onChange={this.onChange}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" onChange={this.onChange}/>
            <button onClick={this.handleInput}
                    type="submit" id="submitItemBtn" className="btn btn-primary">CREATE
            </button>
        </form>
            ;
    }
}

export default QuestionForm;
