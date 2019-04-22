import React, {Component} from 'react';
import {Link} from "react-router-dom";
import QuestionForm from "./QuestionForm";


class AnswerList extends Component {

    render() {
        let list = [];

        this.props.questions.forEach((elm) => {
            let description = elm.description;
            if(description.length >= 200){
                description = elm.description.substr(0, 200) + "..";
            }


            list.push(
                <div className="answer" key={elm.id}>
                    <Link to={`/question/${elm.id}`}>
                        <h2>{elm.title}<span className="date">{elm.created}</span></h2>
                        <p>{description}<span className="author">Asked by Herting</span></p>
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

export default AnswerList;
