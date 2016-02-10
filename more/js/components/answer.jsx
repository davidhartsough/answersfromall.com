var React = require('react');

var Answer = React.createClass({
	getInitialState: function() {
		return {
			readyToClick: true,
			hasFill: "init",
			newNumber: "init",
			deleted: false
		};
	},
	favorite: function() {
		if (this.state.readyToClick) {
			this.setState({readyToClick: false});
			var currentNumber = (this.state.newNumber !== "init") ? this.state.newNumber : this.props.stars;
			if (this.props.starObj) {
				this.unfavorite();
				this.setState({
					hasFill: false,
					newNumber: currentNumber - 1
				});
			} else {
				this.props.favorite(this.props.answerObj);
				if (this.props.user) {
					this.setState({
						hasFill: true,
						newNumber: currentNumber + 1
					});
				}
			}
			var self = this;
			setTimeout(function() {
				self.setState({readyToClick: true});
			}, 500);
		}
	},
	unfavorite: function() {
		this.props.unfavorite(this.props.answerObj, this.props.starObj);
	},
	flag: function() {
		if (this.props.user && this.props.answerObj.author) {
			if (this.props.answerObj.author.objectId === this.props.user.objectId) {
				this.deleteAnswer();
			} else {
				this.flagAnswer();
			}
		} else {
			this.flagAnswer();
		}
	},
	flagAnswer: function() {
		if (this.props.user) {
			this.setState({
				reportingAnswer: true
			});
		} else {
			document.getElementById('modal-text').innerHTML = 'Log in to flag';
			document.getElementById('modal').className = 'show';
		}
	},
	displayOverlay: function() {
		return <div id="overlay"></div>;
	},
	report: function() {
		var a = this.props.answerObj;
		var thisUser = this.props.user;
		if (thisUser && a) {
			if (a.flags > 5) {
				this.props.destroyAnswer(a);
				this.dismissReport();
			} else {
				this.props.reportAnswer(a);
				this.dismissReport();
			}
		} else {
			this.dismissReport();
		}
	},
	displayReport: function() {
		return <div id="report"><p id="report-text">Report this answer?</p><button className="btn btn-default" onClick={this.report}>Yes</button><button className="btn btn-default" onClick={this.dismissReport}>No</button></div>;
	},
	dismissReport: function() {
		this.setState({
			reportingAnswer: false
		});
	},
	trash: function() {
		var a = this.props.answerObj;
		var thisUser = this.props.user;
		if (thisUser && a) {
			this.props.destroyAnswer(a);
			this.dismissTrash();
			this.setState({
				deleted: true
			});
		} else {
			this.dismissTrash();
		}
	},
	deleteAnswer: function() {
		this.setState({
			deletingAnswer: true
		});
	},
	displayTrash: function() {
		return <div id="delete"><p id="delete-text">Delete your answer?</p><button className="btn btn-default" onClick={this.trash}>Yes</button><button className="btn btn-default" onClick={this.dismissTrash}>No</button></div>;
	},
	dismissTrash: function() {
		this.setState({
			deletingAnswer: false
		});
	},
	render: function() {
		var fill = this.props.starObj ? '-fill' : '';
		var starNumber = (this.props.stars) ? this.props.stars : 0;
		if (this.state.hasFill !== "init") {
			if (this.state.hasFill) {
				fill = '-fill';
			} else {
				fill = '';
			}
		}
		if (this.state.newNumber !== "init") {
			starNumber = this.state.newNumber;
		}
		if (starNumber < 0) {
			starNumber = 0;
		}
		var imgIcon = 'flag';
		if (this.props.user && this.props.answerObj.author) {
			if (this.props.answerObj.author.objectId === this.props.user.objectId) {
				imgIcon = 'delete';
			}
		}
		var overlay = null;
		var report = null;
		if (this.state.reportingAnswer) {
			overlay = this.displayOverlay();
			report = this.displayReport();
		}
		var trash = null;
		if (this.state.deletingAnswer) {
			overlay = this.displayOverlay();
			trash = this.displayTrash();
		}
		if (this.state.deleted) {
			return null;
		}
		return (
			<li className="list-group-item"><span className="badge" onClick={this.favorite}> <img src={"../img/star" + fill + ".png"} /> {starNumber}</span>{this.props.description}<span id="flag" onClick={this.flag}><img src={"../img/" + imgIcon + ".png"} alt="flag" /></span>{overlay}{report}{trash}</li>
		);
	}
});

module.exports = Answer;
