// * ———————————————————————————————————————————————————————— * //
// * 	Enduro Admin login sessions
// * ———————————————————————————————————————————————————————— * //
const admin_sessions = function () {}

// * vendor dependencies
const Promise = require('bluebird')
const moment = require('moment')
const jwt = require('jsonwebtoken')

// * enduro dependencies
const admin_security = require(enduro.enduro_path + '/libs/admin_utilities/admin_security')
const logger = require(enduro.enduro_path + '/libs/logger')

// constants
const TOKEN_EXPIRATION = 4 // hours

admin_sessions.prototype.create_session = function (req, user) {
	return new Promise(function (resolve, reject) {
		logger.timestamp('creating session for: ' + JSON.stringify(user), 'admin_login')

		const payload = {
			username: user.username,
			exp: moment().add(TOKEN_EXPIRATION, 'hours').unix()
		}

		jwt.sign(payload, 'secret', (err, token) => {
			if (err) { return reject(err) }

			resolve({
				success: true,
				sid: token
			})
		})
	})
}

admin_sessions.prototype.get_user_by_session = function (token) {
	logger.timestamp('getting user by session', 'admin_login')

	return new Promise((resolve, reject) => {
		if (!token) { return reject('session doesn\'t exist') }

		jwt.verify(token, 'secret', (err, decoded) => {
			if (err) { return reject('session expired') }

			resolve(admin_security.get_user_by_username(decoded.username))
		})
	})
}

module.exports = new admin_sessions()
