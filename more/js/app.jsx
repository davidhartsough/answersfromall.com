var React = require('react'),
	Parse = require('parse').Parse,
	ParseReact = require('parse-react'),
	Home = require('./routes/home.jsx'),
	Question = require('./routes/question.jsx'),
	Nav = require('./components/nav.jsx'),
	CircularProgress = require('material-ui/lib/circular-progress');


var App = React.createClass({
	mixins: [ParseReact.Mixin],
	getInitialState: function() {
		return {
			answerToReport: null,
			answerToTrash: null,
			forgotPassword: false
		};
	},
	observe: function() {
		return {
			user: ParseReact.currentUser,
			questions: (new Parse.Query('Question')).ascending('order'),
			answers: (new Parse.Query('Answer')).descending('createdAt'),
			stars: (new Parse.Query('Star')),
			flags: (new Parse.Query('Flag'))
		};
	},
	favorite: function(a) {
		var thisUser = this.data.user;
		if (thisUser) {
			var self = this;
			ParseReact.Mutation.Increment(a, 'stars', 1).dispatch().then(function() {
				ParseReact.Mutation.Create('Star', {
					answer: a,
					user: thisUser
				}).dispatch().then(function() {
					self.refreshQueries(['answers', 'stars']);
				});
			});
		} else {
			document.getElementById('modal-text').innerHTML = 'Log in to favorite';
			document.getElementById('modal').className = 'show';
		}
	},
	unfavorite: function(a, s) {
		var self = this;
		ParseReact.Mutation.Increment(a, 'stars', -1).dispatch();
		ParseReact.Mutation.Destroy(s).dispatch().then(function() {
			self.refreshQueries(['answers', 'stars']);
		});
	},
	reportAnswer: function(a) {
		var self = this;
		var thisUser = this.data.user;
		ParseReact.Mutation.Increment(a, 'flags', 1).dispatch().then(function() {
			ParseReact.Mutation.Create('Flag', {
				answer: a,
				user: thisUser
			}).dispatch().then(function() {
				self.refreshQueries(['answers', 'flags']);
			});
		});
	},
	destroyAnswer: function(a) {
		var self = this;
		ParseReact.Mutation.Increment(a.question, 'answersCount', -1).dispatch();
		ParseReact.Mutation.Destroy(a).dispatch().then(function() {
			self.refreshQueries(['answers']);
		});
	},
	forgotPassword: function() {
		this.setState({
			forgotPassword: true
		});
	},
	resetPassword: function() {
		var email = React.findDOMNode(this.refs.emailReset).value;
		var self = this;
		Parse.User.requestPasswordReset(email, {
			success: function() {
				self.setState({
					passwordResetError: null
				});
				self.dismissPasswordReset();
				document.getElementById('modal-text').innerHTML = 'Sent successfully';
				document.getElementById('modal').className = 'show';
			},
			error: function() {
				self.setState({
					passwordResetError: "Invalid email"
				});
			}
		});
	},
	displayPasswordReset: function() {
		var errors = (this.state.passwordResetError) ? <p className="error">{this.state.passwordResetError}</p> : null;
		return (
			<div id="reset">
				<p id="reset-text">Enter your email address and we’ll send you a link to change your password.</p>
				{errors}
				<input type="email" className="form-control" id="reset-email" ref="emailReset" autoComplete="on" placeholder="Email" />
				<button className="btn btn-default" onClick={this.resetPassword}>Send</button><button className="btn btn-default" onClick={this.dismissPasswordReset}>Cancel</button>
			</div>
		);
	},
	dismissPasswordReset: function() {
		this.setState({
			forgotPassword: false,
			passwordResetError: false
		});
	},
	displayOverlay: function() {
		return <div id="overlay"></div>;
	},
	userStars: function() {
		if (this.data.user) {
			var thisUserId = this.data.user.objectId;
			return this.data.stars.filter(function(s) {
				return (s.user.objectId === thisUserId);
			});
		}
	},
	userFlags: function() {
		if (this.data.user) {
			var thisUserId = this.data.user.objectId;
			return this.data.flags.filter(function(f) {
				return (f.user.objectId === thisUserId);
			});
		}
	},
	home: function() {
		return <Home questions={this.data.questions} data={this.data} />;
	},
	important: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "doQdchKbQI");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "doQdchKbQI");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="suggest" rightLink="life" questionObjectId="doQdchKbQI" title="What is most important?" />;
	},
	life: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "mLzfrjXdAQ");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "mLzfrjXdAQ");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="important" rightLink="experience" questionObjectId="mLzfrjXdAQ" title="How do you make the most of life?" />;
	},
	experience: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "CPRmvOZu3e");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "CPRmvOZu3e");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="life" rightLink="difference" questionObjectId="CPRmvOZu3e" title="What is the best experience a person can have?" />;
	},
	difference: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "DhQ3M8WuO8");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "DhQ3M8WuO8");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="experience" rightLink="message" questionObjectId="DhQ3M8WuO8" title="How will you make a difference?" />;
	},
	message: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "vJgx5uGZ2L");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "vJgx5uGZ2L");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="difference" rightLink="need" questionObjectId="vJgx5uGZ2L" title="If you could send a message to the world, what would it be?" />;
	},
	need: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "XtoUQUs2CD");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "XtoUQUs2CD");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="message" rightLink="fear" questionObjectId="XtoUQUs2CD" title="What does the world need?" />;
	},
	fear: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "FoBYJpLI6q");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "FoBYJpLI6q");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="need" rightLink="happy" questionObjectId="FoBYJpLI6q" title="What do you fear most?" />;
	},
	happy: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "kXwv7GJXrU");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "kXwv7GJXrU");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="fear" rightLink="day" questionObjectId="kXwv7GJXrU" title="What makes you most happy?" />;
	},
	day: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "UzmzZfj6v3");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "UzmzZfj6v3");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="happy" rightLink="suggest" questionObjectId="UzmzZfj6v3" title="What should one do every day?" />;
	},
	suggest: function() {
		var question = this.data.questions.filter(function(q) {
			return (q.objectId === "yjoJ50gpRL");
		});
		question = question[0];
		var answersArray = this.data.answers.filter(function(a) {
			return (a.question.objectId === "yjoJ50gpRL");
		});
		var stars;
		var flags;
		if (this.data.user) {
			stars = this.userStars();
			flags = this.userFlags();
		} else {
			stars = null;
			flags = null;
		}
		return <Question question={question} answers={answersArray} userStars={stars} userFlags={flags} favorite={this.favorite} unfavorite={this.unfavorite} reportAnswer={this.reportAnswer} destroyAnswer={this.destroyAnswer} user={this.data.user} leftLink="day" rightLink="important" questionObjectId="yjoJ50gpRL" title="Suggest a question!" />;
	},
	render: function() {
		var child;
		switch (this.props.route) {
			case '/important':
				child = this.important();
				break;
			case '/life':
				child = this.life();
				break;
			case '/experience':
				child = this.experience();
				break;
			case '/difference':
				child = this.difference();
				break;
			case '/message':
				child = this.message();
				break;
			case '/need':
				child = this.need();
				break;
			case '/fear':
				child = this.fear();
				break;
			case '/happy':
				child = this.happy();
				break;
			case '/day':
				child = this.day();
				break;
			case '/suggest':
				child = this.suggest();
				break;
			case '/':
				child = this.home();
				break;
			default:
				child = this.home();
		}
		var overlay = null;
		var reset = null;
		if (this.state.forgotPassword) {
			overlay = this.displayOverlay();
			reset = this.displayPasswordReset();
		}
		var p = (<CircularProgress mode="indeterminate" size={1.5} />);
		child = (this.data) ? child : p;
		return <div id="afa" className="home-bg"><Nav user={this.data.user} forgotPassword={this.forgotPassword} />{child}<div id="modal" className="hide"><p id="modal-text"></p><span>x</span></div>{overlay}{reset}</div>;
	}
});

module.exports = App;
