import axios from 'axios';
const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const param = '?client_id='+id+'&client_secret='+sec;

/**
 * fetch user info
 */
function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + param);
}

/**
 * fetch repos
 */
function getRepos (username) {
	return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

/**
 * calculate all the stars that the user has
 */
function getTotalStars (repos) {
	return repos.data.reduce(function (prev, current) {
		return prev + current.stargazers_count;
	});
}

/**
 * retrieve the player data.
 */
function getPlayersData (player) {
	return getRepos(player.login)
		.then(getTotalStars)
		.then(function (totalStars) {
			return {
				followers: player.followers,
				totalStars: totalStars
			}
		});
}

/**
 * return an array, after doing some fancy algos to determine a winner.
 */
function calculateScores (players) {
	return [
		parseInt(players[0].followers * 3 + players[0].totalStars, 10),
		parseInt(players[1].followers * 3 + players[1].totalStars, 10),
	]
}

/**
 * fetches player data from github API.
 * @param  Array players
 * @return Array player data
 */
export function getPlayersInfo (players) {
	return axios.all(
		players.map(
			function(username) {
				return getUserInfo(username);
			}
		)
	).then(function (info) {
		return info.map(function (user) {
			return user.data;
		});
	}).catch(function (err) {
		console.warn('Error in getPlayersInfo:', err);
	});
}

/**
 * [battle description]
 * @param  {[type]} players [description]
 * @return {[type]}         [description]
 */
export function battle (players) {
	const playerOneData = getPlayersData(players[0]);
	const playerTwoData = getPlayersData(players[1]);
	return axios.all([playerOneData, playerTwoData])
		.then(calculateScores)
		.catch(function (err) {
			conosle.warn('error in getPlayersInfo: ', err);
		});
}