'use strict'
const config = require('../templates')

module.exports = () => {
	// console.log(config.tpl)
	for (var e in config.tpl) {
		console.log(`\n -  ${e}`)
	}
	process.exit()
}
