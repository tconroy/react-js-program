var axios = require('axios');
var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRET_ID';
var param = '?client_id='+id+'&client_secret='+sec;

function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
	// fetch username repos
	return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars (repos) {
	// calculate all the stars that the user has
	return repos.data.reduce(function (prev, current) {
		return prev + current.stargazers_count;
	});
}

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

// return an array, after doing some fancy algos to determine a winner.
function calculateScores (players) {
	return [
		parseInt(players[0].followers * 3 + players[0].totalStars, 10),
		parseInt(players[1].followers * 3 + players[1].totalStars, 10),
	]
}

var helpers = {
	/**
	 * fetches player data from github API.
	 * @param  Array players
	 * @return Array player data
	 */
	getPlayersInfo: function (players) {
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
	},
	/**
	 * [battle description]
	 * @param  {[type]} players [description]
	 * @return {[type]}         [description]
	 */
	battle: function (players) {
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);
		return axios.all([playerOneData, playerTwoData])
			.then(calculateScores)
			.catch(function (err) {
				conosle.warn('error in getPlayersInfo: ', err);
			});
	}
};

module.exports = helpers;