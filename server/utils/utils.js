var fs = require('fs');

var request = require('request');

exports.downloadURI = function (url,filename,callback) {

    console.log('calling downloadURI in utils');

    console.log('url in utils: ', url);

    console.log('filename in utils: ', filename);

    request(url)
        .pipe(fs.createWriteStream(filename))
        .on('close',function () {
            callback(filename);
            console.log('fileName: ',filename);
        });
};

exports.randomizer = function (length,chars) {
    var result = '';
    for (var i = length;i>0;i--){
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}