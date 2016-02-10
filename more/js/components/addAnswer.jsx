var React = require('react');
var ParseReact = require('parse-react');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');

var AddAnswer = React.createClass({
	getInitialState: function() {
		return {
			answerBtnDisabled: true,
			showCounter: false,
			counter: 100,
			counterError: ''
		};
	},
	handleInputFocus: function() {
		if (this.props.user) {
			if (!this.state.showCounter) {
				this.setState({showCounter: true});
			}
		} else {
			document.getElementById('modal-text').innerHTML = 'Log in to answer';
			document.getElementById('modal').className = 'show';
			this.setState({
				answerBtnDisabled: true,
				showCounter: true
			});
		}
	},
	handleInputChange: function() {
		var answerValue = this.refs.answer.getValue();
		if ((answerValue.indexOf("fuck")) || (answerValue.indexOf("cunt")) || (answerValue.indexOf("bitch")) || (answerValue.indexOf("shit"))) {
			answerValue = answerValue.replace(/fuck/gi, "(cuss)");
			answerValue = answerValue.replace(/cunt/gi, "(cuss)");
			answerValue = answerValue.replace(/bitch/gi, "(cuss)");
			answerValue = answerValue.replace(/shit/gi, "(cuss)");
			this.refs.answer.setValue(answerValue);
		}
		var count = 100 - answerValue.length;
		if (count < 0) {
			this.setState({
				counter: count,
				counterError: true,
				answerBtnDisabled: true
			});
		} else {
			if (count <= 98) {
				this.setState({
					counter: count,
					counterError: false,
					answerBtnDisabled: false
				});
			} else {
				this.setState({
					counter: count,
					counterError: false,
					answerBtnDisabled: true
				});
			}
		}
	},
	handleKeyDown: function(e) {
		if (e.keyCode === 13) {
			this.submitAnswer();
		}
	},
	submitAnswer: function() {
		if (!this.props.user) {
			document.getElementById('modal-text').innerHTML = 'Log in to answer';
			document.getElementById('modal').className = 'show';
			return;
		}
		if (!this.state.answerBtnDisabled) {
			var self = this;
			var userAnswer = this.refs.answer.getValue();
			if (this.props.user) {
				ParseReact.Mutation.Create('Answer', {
					description: userAnswer,
					question: this.props.question,
					author: this.props.user,
					stars: 0
				}).dispatch().then(function() {
					self.refs.answer.clearValue();
					self.setState({
						counter: 100,
						answerBtnDisabled: true
					});
				});
			} else {
				ParseReact.Mutation.Create('Answer', {
					description: userAnswer,
					question: this.props.question,
					stars: 0
				}).dispatch().then(function() {
					self.refs.answer.clearValue();
					self.setState({
						counter: 100,
						answerBtnDisabled: true
					});
				});
			}
			ParseReact.Mutation.Increment(this.props.question, 'answersCount').dispatch();
		} else {
			return;
		}
	},
	render: function() {
		var hintText = (this.props.user) ? "Add an answer..." : "Log in to answer";
		return (
			<li className="list-group-item add-an-answer">
				<div id="answer-form" className="clearfix add-answer">
					<TextField
						hintText={hintText}
						onChange={this.handleInputChange}
						underlineFocusStyle={{borderColor:'#09f'}}
						fullWidth
						ref="answer"
						onEnterKeyDown={this.handleKeyDown}
						onFocus={this.handleInputFocus}
						disabled={(!this.props.user)} />
					<div className="form-right">
						{this.state.showCounter ? <p id="counter" className={this.state.counterError ? 'red' : ''}>{this.state.counter}</p> : null}
						<RaisedButton label="Answer" backgroundColor="#09f" disabledBackgroundColor="#53B7F9" labelColor='#fff' disabledLabelColor='#fff' disabled={this.state.answerBtnDisabled} onClick={this.submitAnswer} />
					</div>
				</div>
			</li>
		);
	}
});

module.exports = AddAnswer;
