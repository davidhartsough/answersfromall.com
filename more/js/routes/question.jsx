var React = require('react');
var Answer = require('../components/answer.jsx');
var AddAnswer = require('../components/addAnswer.jsx');
var Header = require('../components/header.jsx');
var CircularProgress = require('material-ui/lib/circular-progress');
var FontIcon = require('material-ui/lib/font-icon');

var Question = React.createClass({
	getInitialState: function() {
		return {
			sorting: 'sortByTime',
			sortByTimeActive: 'active',
			sortByStarsActive: '',
			sortByRandomActive: '',
			sortByUserActive: '',
			shuffledAnswers: null
		};
	},
	componentDidMount: function() {
		document.getElementById('afa').className = "question-bg";
	},
	handleTimeSortClick: function() {
		this.setState({
			sortByTimeActive: 'active',
			sortByStarsActive: '',
			sortByRandomActive: '',
			sortByUserActive: '',
			sorting: 'sortByTime'
		});
	},
	sortByTime: function() {
		var answersArray = this.props.answers.sort(function(a, b) {
			return b.createdAt - a.createdAt;
		});
		return answersArray;
	},
	handleStarSortClick: function() {
		this.setState({
			sortByTimeActive: '',
			sortByStarsActive: 'active',
			sortByRandomActive: '',
			sortByUserActive: '',
			sorting: 'sortByStars'
		});
	},
	sortByStars: function() {
		var answersArray = this.props.answers.sort(function(a, b) {
			return b.stars - a.stars;
		});
		return answersArray;
	},
	handleRandomSortClick: function() {
		var aa = this.shuffleArray(this.props.answers);
		this.setState({
			sortByTimeActive: '',
			sortByStarsActive: '',
			sortByRandomActive: 'active',
			sortByUserActive: '',
			shuffledAnswers: aa,
			sorting: 'sortByRandom'
		});
	},
	handleUserSortClick: function() {
		this.setState({
			sortByTimeActive: '',
			sortByStarsActive: '',
			sortByRandomActive: '',
			sortByUserActive: 'active',
			sorting: 'sortByUser'
		});
	},
	sortByUser: function() {
		var answersArray;
		if (this.props.user) {
			var thisUserId = this.props.user.objectId;
			answersArray = this.props.answers.filter(function(a) {
				if (a.author) {
					return (a.author.objectId === thisUserId);
				} else {
					return false;
				}
			});
			if (answersArray.length) {
				answersArray = answersArray.sort(function(a, b) {
					return b.createdAt - a.createdAt;
				});
				return answersArray;
			} else {
				answersArray = this.noUserAnswers();
				return answersArray;
			}
		} else {
			answersArray = this.noUser();
			return answersArray;
		}
	},
	shuffleArray: function(array) {
		var m = array.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	},
	noUserAnswers: function() {
		return <li className="list-group-item noAnswers">Your answers will appear here when you answer.</li>;
	},
	noUser: function() {
		return <li className="list-group-item noAnswers">Your answers will appear here when you log in.</li>;
	},
	renderWithStars: function(answersArray) {
		if (answersArray && answersArray.constructor === Array) {
			var favorite = this.props.favorite;
			var unfavorite = this.props.unfavorite;
			var reportAnswer = this.props.reportAnswer;
			var destroyAnswer = this.props.destroyAnswer;
			var user = this.props.user;
			var userStars = this.props.userStars;
			var userFlags = this.props.userFlags;
			if (userStars) {
				answersArray = answersArray.map(function(a) {
					var starsArray = userStars.filter(function(s) {
						return (a.objectId === s.answer.objectId);
					});
					var star = false;
					if (starsArray[0]) {
						if (a.objectId === starsArray[0].answer.objectId) {
							star = starsArray[0];
						}
					}
					if (userFlags) {
						var flagsArray = userFlags.filter(function(f) {
							return (a.objectId === f.answer.objectId);
						});
						if (flagsArray[0]) {
							if (a.objectId === flagsArray[0].answer.objectId) {
								return null;
							}
						} else {
							return <Answer key={a.objectId} answerObj={a} stars={a.stars} favorite={favorite} unfavorite={unfavorite} reportAnswer={reportAnswer} destroyAnswer={destroyAnswer} description={a.description} user={user} starObj={star} />;
						}
					} else {
						return <Answer key={a.objectId} answerObj={a} stars={a.stars} favorite={favorite} unfavorite={unfavorite} reportAnswer={reportAnswer} destroyAnswer={destroyAnswer} description={a.description} user={user} starObj={star} />;
					}
				});
			} else {
				answersArray = answersArray.map(function(a) {
					return <Answer key={a.objectId} answerObj={a} stars={a.stars} favorite={favorite} unfavorite={unfavorite} reportAnswer={reportAnswer} destroyAnswer={destroyAnswer} description={a.description} user={user} />;
				});
			}
			return answersArray;
		} else {
			return answersArray;
		}
	},
	render: function() {
		var answersArray = this.props.answers;
		switch(this.state.sorting) {
			case 'sortByTime':
				answersArray = this.sortByTime();
				break;
			case 'sortByStars':
				answersArray = this.sortByStars();
				break;
			case 'sortByRandom':
				answersArray = this.state.shuffledAnswers;
				break;
			case 'sortByUser':
				answersArray = this.sortByUser();
				break;
		}
		answersArray = this.renderWithStars(answersArray);
		var a = (
				<ul className="list-group">
					<AddAnswer user={this.props.user} question={this.props.question} />
					{answersArray}
				</ul>
				);
		var p = (<CircularProgress mode="indeterminate" size={1.5} />);
		var m = (this.props.answers) ? a : p;
		return (
			<div className="container-fluid">
				<Header title={this.props.title} leftLink={this.props.leftLink} rightLink={this.props.rightLink} />
				<div className="toolbar row">
					<div className="col-xs-3">
						<button style={{height:44}} type="button" className={"btn btn-default " + this.state.sortByTimeActive} onClick={this.handleTimeSortClick}>
							<FontIcon style={{fontSize:30}} className="material-icons">access_time</FontIcon>
						</button>
					</div>
					<div className="col-xs-3">
						<button style={{height:44}} type="button" className={"btn btn-default " + this.state.sortByStarsActive} onClick={this.handleStarSortClick}>
							<FontIcon style={{fontSize:30}} className="material-icons">star_border</FontIcon>
						</button>
					</div>
					<div className="col-xs-3">
						<button style={{height:44}} type="button" className={"btn btn-default " + this.state.sortByRandomActive} onClick={this.handleRandomSortClick}>
							<FontIcon style={{fontSize:30}} className="material-icons">shuffle</FontIcon>
						</button>
					</div>
					<div className="col-xs-3">
						<button style={{height:44}} type="button" className={"btn btn-default " + this.state.sortByUserActive} onClick={this.handleUserSortClick}>
							<FontIcon style={{fontSize:30}} className="material-icons">person</FontIcon>
						</button>
					</div>
				</div>
				<div className="answers row">
					{m}
				</div>
			</div>
		);
	}
});

module.exports = Question;
