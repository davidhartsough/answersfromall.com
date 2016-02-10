var React = require('react');

var QuestionLink = React.createClass({
	render: function() {
		return (
			<a href={"#/" + this.props.tag} className="list-group-item"><span className="badge">{this.props.answersCount}</span>{this.props.description}</a>
		);
	}
});

module.exports = QuestionLink;
