// * ———————————————————————————————————————————————————————— * //
// * 	Logout
// *
// * 	Admin api endpoint admin_api/logout
// *	@param {string} sid - Session id stored in cookie on client
// *	@return {response} - Success boolean and user info
// * ———————————————————————————————————————————————————————— * //
const api_call = function () {}

// * enduro dependencies

// routed call
api_call.prototype.call = function (req, res, enduro_server) {

	// gets session id from query parameters
	const sid = req.headers.sid

	// if no session provided
	if (!sid) {
		res.send({success: false, message: 'no sessionid provided'})
		return
	}

	res.send({success: true})
}

module.exports = new api_call()
