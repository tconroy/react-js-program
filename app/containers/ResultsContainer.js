var React = require('react');
var Results = require('../components/Results');
var githubHelpers = require('../utils/githubHelpers');

var ResultsContainer = React.createClass({
	getInitialState: function() {
		return {
			isLoading: true,
			scores: [],
		};
	},
	componentDidMount: function() {
		githubHelpers.battle(this.props.location.state.playerInfo)
			.then(function (scores) {
				this.setState({
					scores: scores,
					isLoading: false,
				});
			}.bind(this)); // maintains the context of "this"
	},
	render: function() {
		console.log('state: ', this.state);
		return (
			<Results
				playersInfo={this.props.location.state.playerInfo}
				isLoading={this.state.isLoading}
				scores={this.state.scores} />
		);
	}

});

module.exports = ResultsContainer;