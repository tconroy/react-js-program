import React from 'react';
import Results from '../components/Results'
import { battle } from '../utils/githubHelpers';

const ResultsContainer = React.createClass({
	getInitialState: function() {
		return {
			isLoading: true,
			scores: [],
		};
	},
	componentDidMount: function() {
		battle(this.props.location.state.playerInfo)
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

export default ResultsContainer;