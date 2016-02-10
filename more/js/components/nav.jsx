var React = require('react');
var Parse = require('parse').Parse;

var Nav = React.createClass({
	getInitialState: function() {
		return {
			showSignUp: false,
			loginError: null,
			signupError: null
		};
	},
	logIn: function() {
		var self = this;
		var username = React.findDOMNode(this.refs.usernameLogin).value;
		var password = React.findDOMNode(this.refs.passwordLogin).value;
		if (username.length && password.length) {
			Parse.User.logIn(username, password).then(function() {
				self.setState({loginError: null});
				self.toggleDropdown();
			}, function() {
				self.setState({loginError: 'Incorrect username or password'});
			});
		} else {
			this.setState({loginError: 'Please enter all fields'});
		}
	},
	signUp: function() {
		var self = this;
		var username = React.findDOMNode(this.refs.usernameSignup).value;
		var email = React.findDOMNode(this.refs.emailSignup).value;
		var password = React.findDOMNode(this.refs.passwordSignup).value;
		if (username.length && password.length && email.length) {
			var u = new Parse.User({
				username: username,
				email: email,
				name: username,
				password: password
			});
			u.signUp().then(function() {
				self.setState({signupError: null});
				self.toggleDropdown();
			}, function() {
				self.setState({signupError: 'Invalid account information'});
			});
		} else {
			this.setState({signupError: 'Please enter all fields'});
		}
	},
	fbLogin: function() {
		Parse.FacebookUtils.logIn("public_profile", {
			success: function(user) {
				console.log("User " + user + " logged in through Facebook!");
			},
			error: function(user, error) {
				console.log("User " + user + " cancelled the Facebook login or did not fully authorize. Here is an error: " + error);
			}
		});
	},
	logOut: function() {
		Parse.User.logOut();
	},
	keyDown: function(e) {
		if (e.keyCode === 13) {
			if (this.state.showSignUp) {
				this.signUp();
			} else {
				this.logIn();
			}
		}
	},
	showLogOut: function() {
		return (
			<div className="user-menu logout">
				<button className="btn btn-default btn-block" id="logout-btn" onClick={this.logOut}>Log Out</button>
			</div>
		);
	},
	showLogin: function() {
		return (
			<div className="user-menu">
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className={this.state.showSignUp ? "" : "active"}>
						<button role="tab" className="tab" onClick={this.toggleSignUp}>Log In</button>
					</li>
					<li role="presentation" className={this.state.showSignUp ? "active" : ""}>
						<button role="tab" className="tab" onClick={this.toggleSignUp}>Sign Up</button>
					</li>
				</ul>
				<div className="tab-content" onKeyDown={this.keyDown}>
					<div role="tabpanel" className={this.state.showSignUp ? "tab-pane" : "tab-pane active"} id="login">
						<div className="social-buttons">
							<button className="btn btn-default facebook" id="facebook-login" onClick={this.fbLogin}><span className="button-left-icon"><img src="./img/facebook.png" /></span>Facebook</button>
						</div>
						<div className="user-menu-separator">
							<span>or</span>
						</div>
						<div className="username-login">
							<div id="user-login-form" className="form">
								{this.state.loginError ? <p className="error">{this.state.loginError}</p> : null}
								<input type="text" id="username-login" className="form-control" ref="usernameLogin" autoComplete="on" placeholder="Username" />
								<input type="password" id="password-login" className="form-control" ref="passwordLogin" placeholder="Password" />
								<button className="btn btn-default btn-block form-submit" id="username-login-btn" onClick={this.logIn}>Log In</button>
								<p className="forgot-password" onClick={this.handleForgotPasswordClick}>Forgot Password?</p>
							</div>
						</div>
					</div>
					<div role="tabpanel" className={this.state.showSignUp ? "tab-pane active" : "tab-pane"} id="signup">
						<div className="social-buttons">
							<button className="btn btn-default facebook" id="facebook-signup" onClick={this.fbLogin}><span className="button-left-icon"><img src="./img/facebook.png" /></span>Facebook</button>
						</div>
						<div className="user-menu-separator">
							<span>or</span>
						</div>
						<div className="email-signup">
							<div id="user-signup-form" className="form">
								{this.state.signupError ? <p className="error">{this.state.signupError}</p> : null}
								<input type="text" id="username-login" className="form-control" ref="usernameSignup" placeholder="Username" />
								<input type="password" id="password-login" className="form-control" ref="passwordSignup" placeholder="Password" />
								<input type="email" className="form-control" id="user-email" ref="emailSignup" autoComplete="on" placeholder="Email" />
								<button className="btn btn-default btn-block form-submit" id="username-signup-btn" onClick={this.signUp}>Sign Up</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	handleForgotPasswordClick: function() {
		this.toggleDropdown();
		this.props.forgotPassword();
	},
	toggleSignUp: function() {
		this.setState({showSignUp: !this.state.showSignUp});
	},
	toggleDropdown: function() {
		if (document.getElementById('dropdown').className === "hide") {
			document.getElementById('dropdown').className = "show";
		} else {
			document.getElementById('dropdown').className = "hide";
		}
	},
	render: function() {
		var username = (this.props.user) ? this.props.user.name : "Not signed in";
		var usermenu = (this.props.user) ? this.showLogOut() : this.showLogin();
		return (
			<div className="container-fluid">
				<nav className="row">
					<div className="col-xs-6 nav-left">
						<a href="#/"><img alt="AnswersFromAll logo" src="./img/afa-logo-81-48.png" /></a>
					</div>
					<div className="col-xs-6 nav-right">
						<div className="button-wrapper" id="button-wrapper">
							<button id="trigger" type="button" className="btn btn-default" onClick={this.toggleDropdown}><span>{username + " "}</span> <span><img alt="user" src="./img/user.png" /></span></button>
								<div id="dropdown" className="hide">
									<div className="triangle t-bottom" />
									<div className="triangle t-top" />
									{usermenu}
								</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
});

module.exports = Nav;
