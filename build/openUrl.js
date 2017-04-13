/*jshint esversion: 6 */ /*jshint -W030 */
const readline = require('readline');
var ora = require('ora');
var opn = require('opn');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Bạn có muốn truy cập ứng dụng? (y/n):  ', (answer) => {
    if (answer == 'y' || answer == 'c') {
        var spinner = ora('Đang truy cập ứng dụng ...');
        spinner.color = 'yellow';
        spinner.start();
        setTimeout(() => {
            spinner.succeed(['Đã truy cập ứng dụng']);
            opn('http://nhch.surge.sh');
        }, 1234);
        rl.close();
    } else {
        rl.close();
    }
});
