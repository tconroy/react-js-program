// var React = require('react');
// var ReactDOM = require('react-dom');

// var HelloWorld = React.createClass({
// 	render: function () {
// 		return (
// 			<div>Hello {this.props.name}!</div>
// 		);
// 	}
// });

// ReactDOM.render(
// 	<HelloWorld name="Tom" />,
// 	document.getElementById('app')
// );

var React = require('react');
var ReactDOM = require('react-dom');

var ProfilePic = React.createClass({
	render: function() {
		return (
			<img src={'https://photo.fb.com/'+this.props.username} />
		);
	}
});
var ProfileLink = React.createClass({
	render: function () {
		return (
			<a href={'https://www.fb.com/'+this.props.username}>
				{this.props.username}
			</a>
		);
	}
})
var Avatar = React.createClass({
	render: function () {
		return (
			<div>
				<ProfilePic username={this.props.username} />
				<ProfileLink username={this.props.username} />
			</div>
		);
	}
})

ReactDOM.render(
	<Avatar username="tylermcginnis" />,
	document.getElementById('app')
);