require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');

var spinner = ora('Tiến hành build dự án...');
spinner.color = 'yellow';
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, function(err, stats) {
        spinner.succeed();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        //DONE
        console.log(chalk.white.bgGreen.bold(' Đã hoàn thành !'));
    });
});
