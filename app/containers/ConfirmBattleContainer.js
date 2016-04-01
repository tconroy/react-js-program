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
	async componentDidMount () {
		const { query } = this.props.location;
		try {
			const players = await getPlayersInfo([query.playerOne, query.playerTwo]);
			this.setState({
				isLoading: false,
				playersInfo: [players[0], players[1]]
			});
		} catch (err) {
			console.warn('Error in ConfirmBattleContainer: ', err);
		}
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