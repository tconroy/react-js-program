import React from 'react';
import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers';

const ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired,
	},
	getInitialState: function () {
		return {
			isLoading: true,
			playersInfo: [],
		}
	},
	componentDidMount: function () {
		const { query } = this.props.location;
		getPlayersInfo([query.playerOne, query.playerTwo])
		.then(function(players) {
			this.setState({
				isLoading: false,
				playersInfo: [players[0], players[1]]
			})
		}.bind(this));
	},
	handleInitiateBattle: function () {
		this.context.router.push({
			pathname: '/results',
			state: {
				playerInfo: this.state.playersInfo,
			}
		})
	},
	render: function () {
		return (
			<ConfirmBattle
				onInitiateBattle={this.handleInitiateBattle}
				isLoading={this.state.isLoading}
				playersInfo={this.state.playersInfo}
			/>
		);
	}
});

export default ConfirmBattleContainer;