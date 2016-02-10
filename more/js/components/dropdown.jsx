var React = require('react');

var Dropdown = React.createClass({
	render: function() {
		if (this.props.loggedIn) {
			return (
				<div id="dropdown">
					<div className="triangle t-bottom" />
					<div className="triangle t-top" />
					<div className="user-menu">
						<button className="btn btn-default btn-block" id="logout-btn">Log Out</button>
					</div>
				</div>
			);
		} else {
			return (
				<div id="dropdown">
					<div className="triangle t-bottom" />
					<div className="triangle t-top" />
					<div className="user-menu">
						<ul className="nav nav-tabs" role="tablist">
							<li role="presentation" className="active">
								<a href="#login" role="tab" data-toggle="tab">Log In</a>
							</li>
							<li role="presentation">
								<a href="#signup" role="tab" data-toggle="tab">Sign Up</a>
							</li>
						</ul>
						<div className="tab-content">
							<div role="tabpanel" className="tab-pane active" id="login">
								<div className="social-buttons">
									<button className="btn btn-default facebook" id="facebook-login"><span className="button-left-icon"><img src="./img/facebook.png" /> </span> Facebook</button>
									<button className="btn btn-default twitter" id="twitter-login"><span className="button-left-icon"><img src="./img/twitter.png" /> </span> Twitter</button>
								</div>
								<div className="user-menu-separator">
									<span>or</span>
								</div>
								<div className="username-login">
									<form id="user-login-form" name="user-login">
										<input type="text" id="username-login" className="form-control" name="username" autoComplete="on" placeholder="Username" />
										<input type="password" id="password-login" className="form-control" name="password" placeholder="Password" />
										<button className="btn btn-default btn-block" id="username-login-btn" type="submit" form="user-login-form" name="login">Log In</button>
										<div className="forgot-password">
											<a href="#" id="forgot-password-a">Forgot Password?</a>
										</div>
									</form>
								</div>
							</div>
							<div role="tabpanel" className="tab-pane" id="signup">
								<div className="social-buttons">
									<button className="btn btn-default facebook" id="facebook-signup"><span className="button-left-icon"><img src="./img/facebook.png" /> </span> Facebook</button>
									<button className="btn btn-default twitter" id="twitter-signup"><span className="button-left-icon"><img src="./img/twitter.png" /> </span> Twitter</button>
								</div>
								<div className="user-menu-separator">
									<span>or</span>
								</div>
								<div className="email-signup">
									<form id="user-signup-form" name="user-signup">
										<input type="text" id="username-login" className="form-control" name="username" placeholder="Username" />
										<input type="email" className="form-control" id="user-email" name="email" autoComplete="on" placeholder="Email" />
										<input type="password" id="password-login" className="form-control" name="password" placeholder="Password" />
										<button className="btn btn-default btn-block" id="username-signup-btn" type="submit" form="user-login-form" name="signup">Sign Up</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
});

module.exports = Dropdown;
