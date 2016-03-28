var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired,
	},
	getInitialState: function () {
		console.log('getInitialState');
		return {
			isLoading: true,
			playersInfo: [],
		}
	},
	componentDidMount: function () {
		var query = this.props.location.query;

		githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
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

module.exports = ConfirmBattleContainer;