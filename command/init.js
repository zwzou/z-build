'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const download = require('download-git-repo') 
const ora = require('ora')

module.exports = (path) => {
	co(function *() {
		// 处理用户输入
		let tplName = path ? path : yield prompt('Template name: ')
		let projectName = yield prompt('Project name: ')
		let gitUrl
		let branch

		if (!config.tpl[tplName]) {
			console.log(chalk.red('\n × Template does not exit!'))
			process.exit()
		}

		gitUrl = config.tpl[tplName].gitUrl
		branch = config.tpl[tplName].branch

		console.log('\n ')
		const spinner = ora('Start gennerating...').start();

		download(gitUrl, projectName, (err) => {
			if (err) {
				spinner.warn(['发生错误！'])
				process.exit()
			} else {
				// 提示成功
				spinner.clear()
				console.log(chalk.green(`\n √ Generation ${tplName} completed!`))

				// 提示接下来的步骤
				console.log(`\n\n /---The following operations----/`)

				console.log(chalk.yellow(`\n // 进入目录`))
				console.log(chalk.yellow(`sudo cd ${projectName}`))

				console.log(chalk.yellow(`\n // 初始化项目`))
				console.log(chalk.yellow(`sudo npm install`))

				console.log(chalk.yellow(`\n // 启动项目`))
				console.log(chalk.yellow(`sudo npm start || npm run dev`))

				console.log(`\n /-------------------------------/`)
				console.log(`\n 有问题请上https://github.com/zwzou联系我`)
				process.exit()
			}
		})
	})
}
