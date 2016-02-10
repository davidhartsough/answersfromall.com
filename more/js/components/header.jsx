var React = require('react');
var FontIcon = require('material-ui/lib/font-icon');

var Header = React.createClass({
	render: function() {
		return (
			<header className="row question" id="question-header" style={{overflow:'hidden'}}>
				<div className="row-height">
					<div className="col-xs-1 col-height col-middle" style={{padding:0}}>
						<div className="inside">
							<div className="content">
								<a href={"#/" + this.props.leftLink} className="header-nav-arrow" style={{display:'block',height:'100%', zIndex:999, width:50, position:'absolute', left:0}}>
									<div style={{display:'table',width:'100%',height:'100%'}}>
										<div style={{display:'table-cell',textAlign:'center',verticalAlign:'middle'}}>
											<FontIcon className="material-icons" color="#eef4f4" hoverColor="#fff" style={{margin:"0 -25px",fontSize:100}}>chevron_left</FontIcon>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="col-xs-10 col-height">
						<div className="inside">
							<div className="content">
								<h1>{this.props.title}</h1>
							</div>
						</div>
					</div>
					<div className="col-xs-1 col-height col-middle" style={{padding:0}}>
						<div className="inside">
							<div className="content">
								<a href={"#/" + this.props.rightLink} className="header-nav-arrow" style={{display:'block',height:'100%', zIndex:999, width:50, position:'absolute', right:0}}>
									<div style={{display:'table',width:'100%',height:'100%'}}>
										<div style={{display:'table-cell',textAlign:'center',verticalAlign:'middle'}}>
											<FontIcon className="material-icons" color="#eef4f4" hoverColor="#fff" style={{margin:"0 -25px",fontSize:100}}>chevron_right</FontIcon>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
});

module.exports = Header;
