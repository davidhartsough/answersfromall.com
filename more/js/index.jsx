var React = require("react");
var ReactDOM = require('react-dom');
var Parse = require('parse').Parse;
var App = require("./app.jsx");

Parse.initialize("KEY", "KEY");

window.fbAsyncInit = function() {
	Parse.FacebookUtils.init({
		appId: '735344409890243',
		cookie: true,
		xfbml: true,
		version: 'v2.4'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

function render () {
	var route = window.location.hash.substr(1);
	ReactDOM.render(<App route={route} />, document.getElementById('app'));
}

if (!('onhashchange' in window)) {
    var oldHref = location.href;
    setInterval(function() {
        var newHref = location.href;
        if (oldHref !== newHref) {
            var oldoldHref = oldHref;
            oldHref = newHref;
            render.call(window, {
                'type': 'hashchange',
                'newURL': newHref,
                'oldURL': oldoldHref
            });
        }
    }, 100);
} else if (window.addEventListener) {
    window.addEventListener("hashchange", render, false);
}
else if (window.attachEvent) {
    window.attachEvent("onhashchange", render);
}

render();

function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  } else {
    return isChildOf(child.parentNode, parent);
  }
}


document.body.onclick = function(e) {
  if (document.getElementById('modal').className === 'show') {
    document.getElementById('modal').className = 'hide';
  }
  var target = e.target || e.srcElement;
  var dropdownSection = document.getElementById('button-wrapper');
  if (dropdownSection) {
    if (target !== dropdownSection && !isChildOf(target, dropdownSection)) {
      document.getElementById('dropdown').className = "hide";
    }
  }
};
