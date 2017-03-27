'use strict';

var fs = require('fs');
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
            var img = $("meta[itemprop ='image']").get(1);
            var $img = $(img).attr('content');
            var $desc = $("meta[itemprop = 'text']").attr('content');

            console.log($img + 'pin url');

            var pin = {
                img:$img,
                url:$url,
                desc: $desc
            }

            console.log('scraped: ', pin);
            cb(pin);
        }
    })
} 