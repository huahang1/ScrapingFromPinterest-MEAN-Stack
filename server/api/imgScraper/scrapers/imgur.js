'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list =function (url,cb) {

    //this is the actual request to the pinterest page I care about
    request(url, function (error,resp,body) {

        if (error){
            cb({error:error});
        }

        if (!error){
            var $ = cheerio.load(body);
            var $url = url;
            var $img = $('.post-img img').attr('src');
            var $desc = $('.post-img img').attr('alt');

            console.log($img + 'image url');

            var image = {
                img:'http:' + $img,
                url:$url,
                desc: $desc
            }

            console.log('scraped: ',image);

            cb(image);
        }
    });
}