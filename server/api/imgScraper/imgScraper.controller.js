'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest.js');
scrapers['imgur'] = require('./scrapers/imgur.js');

exports.scrape = function (req,res) {

    var url = req.body.url;

    console.log('url in Scraper: ', url);

    var scraperToUse;

    if (url.indexOf('pinterest') > -1){
        scraperToUse = 'pinterest';
    }else if(url.indexOf('imgur') > -1){
        scraperToUse = 'imgur';
    }else{
        console.log('cannot locate scraper');
    }

    scrapers[scraperToUse].list(url, function (data) {
        console.log('data from scraper: ', data);
        res.json(data);
    });
}