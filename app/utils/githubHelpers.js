import axios from 'axios';
const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const param = `?client_id=${id}&client_secret=${sec}`;

/**
 * fetch user info
 */
function getUserInfo (username = 'tconroy') {
	return axios.get(`https://api.github.com/users/${username+param}`);
}

/**
 * fetch repos
 */
function getRepos (username = 'tconroy') {
	return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`);
}

/**
 * calculate all the stars that the user has
 */
function getTotalStars (repos) {
	return repos.data.reduce((prev, current) => {
		return prev + current.stargazers_count;
	});
}

/**
 * retrieve the player data.
 */
async function getPlayersData (player) {
	try {
		const repos = await getRepos(player.login);
		const totalStars = await getTotalStars(repos);
		return {
			followers: player.followers,
			totalStars
		}
	} catch (err) {
		console.warn('Error in githubHelpers: ', err);
	}
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
export async function getPlayersInfo (players) {
	try {
		const info = await Promise.all(players.map((username) => getUserInfo(username)));
		return info.map((user) => user.data);
	} catch (err) {
		console.warn('Error in githubHelpers: ', err);
	}
}

/**
 * [battle description]
 * @param  {[type]} players [description]
 * @return {[type]}         [description]
 */
export async function battle (players) {
	try {
		const playerOneData = getPlayersData(players[0]);
		const playerTwoData = getPlayersData(players[1]);
		const data = await Promise.all([playerOneData, playerTwoData]);
		return await calculateScores(data);
	} catch (err) {
		console.warn('Error in githubHelpers: ', err);
	}
}