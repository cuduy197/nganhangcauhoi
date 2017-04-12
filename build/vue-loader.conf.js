var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: {
        js: 'babel-loader?presets[]=env&presets[]=stage-0'
    }
};
