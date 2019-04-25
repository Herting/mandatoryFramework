import React, {Component} from 'react';
import {Link} from "react-router-dom";
import QuestionForm from "./QuestionForm";


class QuestionList extends Component {

    render() {
        let list = [];
        let questions = this.props.questions;

        questions.forEach((elm) => {
            let description = elm.description;
            if(description.length >= 200){
                description = elm.description.substr(0, 200) + "..";
            }


            list.push(
                <div className="question" key={elm.id}>
                    <Link to={`/question/${elm.id}`}>
                        <h2>{elm.title}</h2>
                        <span className="date">{elm.created}</span>
                        <p>{description}<span className="author">Asked by {elm.author}</span></p>
                    </Link>
                </div>
            )

        });

        return (
            <div className="noPadding">
                <QuestionForm addQuestion={this.props.addQuestion} />

                {list}
            </div>
        );
    }
}

export default QuestionList;
