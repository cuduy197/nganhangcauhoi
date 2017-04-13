/*jshint esversion: 6 */ /*jshint -W030 */
var fs = require('fs.extra');
var ora = require('ora');


var spinner = ora('Tạo file 200.html');
spinner.color = 'yellow';
spinner.start();



setTimeout(() => {
    fs.copy('./dist/index.html', './dist/200.html', { replace: true }, function(err) {
        if (err) {
            spinner.fail([err]);
        } else {
            setTimeout(() => { spinner.succeed(['Đã tạo file 200.html']); }, 1234);
        }
    });
}, 1000);
