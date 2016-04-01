import React from 'react';
import Results from '../components/Results'
import { battle } from '../utils/githubHelpers';

const ResultsContainer = React.createClass({
	getInitialState () {
		return {
			isLoading: true,
			scores: [],
		};
	},
	async componentDidMount () {
		try {
			const scores = await battle(this.props.location.state.playerInfo)
			this.setState({
				scores,
				isLoading: false,
			});
		} catch (err) {
			console.warn('Error in ResultsContainer: ', err);
		}
	},
	render () {
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