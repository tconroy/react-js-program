import React from 'react';
import Prompt from '../components/Prompt'

const PromptContainer = React.createClass({
	// pass items to components without going through props.
	contextTypes: {
		router: React.PropTypes.object.isRequired,
	},
	getInitialState () {
		return {
			username: '',
		};
	},
	handleUpdateUser (e) {
		this.setState({
			username: e.target.value,
		})
	},
	handleSubmitUser (e) {
		e.preventDefault();
		const { username } = this.state;
		this.setState({
			username: '',
		});

		const { playerOne } = this.props.routeParams;

		if (playerOne) {
			// go to battle
			this.context.router.push({
				pathname: '/battle',
				query: {
					playerOne,
					playerTwo: username
				}
			});
		} else {
			// go to player 2
			this.context.router.push(`/playerTwo/${username}`);
		}
	},
	render () {
		return (
			<Prompt
				onSubmitUser={this.handleSubmitUser}
				onUpdateUser={this.handleUpdateUser}
				header={this.props.route.header}
				username={this.state.username}
			 />
		);
	}
});

export default PromptContainer;