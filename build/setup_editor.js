var fs = require('fs.extra');
var ora = require('ora');


var spinner = ora('Chỉnh sửa editor ...');
spinner.color = 'blue';
spinner.start();



setTimeout(() => {
    fs.copy('./static/vue-html5-editor.js', './node_modules/vue-html5-editor/dist/vue-html5-editor.js', { replace: true }, function(err) {
        if (err) {
            spinner.fail([err]);
        } else {
            setTimeout(() => { spinner.succeed(['Đã chỉnh sửa editor !']); }, 1234);
        }
    });
}, 1000);
