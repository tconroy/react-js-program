import React from 'react';
import ConfirmBattle from '../components/ConfirmBattle'
import { getPlayersInfo } from '../utils/githubHelpers';

const ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired,
	},
	getInitialState () {
		return {
			isLoading: true,
			playersInfo: [],
		}
	},
	componentDidMount () {
		const { query } = this.props.location;
		getPlayersInfo([query.playerOne, query.playerTwo])
		.then((players) => {
			this.setState({
				isLoading: false,
				playersInfo: [players[0], players[1]]
			})
		});
	},
	handleInitiateBattle () {
		this.context.router.push({
			pathname: '/results',
			state: {
				playerInfo: this.state.playersInfo,
			}
		})
	},
	render () {
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