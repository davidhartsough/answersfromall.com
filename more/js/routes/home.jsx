var React = require('react');
var QuestionLink = require('../components/questionLink.jsx');
var CircularProgress = require('material-ui/lib/circular-progress');

var Home = React.createClass({
	componentDidMount: function() {
		document.getElementById('afa').className = "home-bg";
	},
	render: function() {
		var qs = this.props.questions.map(function(q) {
			return <QuestionLink key={q.objectId} tag={q.tag} answersCount={q.answersCount} description={q.description} />;
		});
		var p = <CircularProgress mode="indeterminate" size={1.5} />;
		var m = (this.props.questions) ? qs : p;
		return (
			<div className="container">
				<header className="home">
					<img alt="Answers From All" src="./img/answersfromall.png" />
					<h2><span>Ask big questions.</span> <span>Explore all answers.</span></h2>
				</header>
				<div className="questions">
					<div className="list-group">
						{m}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Home;
