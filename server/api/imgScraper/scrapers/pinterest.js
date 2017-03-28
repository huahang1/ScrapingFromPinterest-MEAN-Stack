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

            //grab the img source directly
            var $img = $('img').attr('src');
            console.log('img: ', $img);

            //grab the description from the alternative attribution
            var $desc = $('img').attr('alt');

            console.log('desc: ', $desc);

            console.log($img + ' pin url');

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