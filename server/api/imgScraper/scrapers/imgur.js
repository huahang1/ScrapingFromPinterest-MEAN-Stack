'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list =function (url,cb) {
    request(url, function (error,resp,body) {

        if (error){
            cb({error:error});
        }

        if (!error){
            var $ = cheerio.load(body);
            var pin = {};
            var $url = url;
            var $img = $('.heightContainer img').attr('src');
            var $desc = $('.heightContainer img').attr('alt');

            console.log($img + 'pin url');

            var pin = {
                img:$img,
                url:'http: ' + $url,
                desc: $desc
            }

            cb(pin);
        }
    })
}