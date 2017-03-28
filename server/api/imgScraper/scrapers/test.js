var cheerio = require('cheerio');
var request = require('request');

request('https://www.pinterest.com/pin/475552041877236482/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var list = [];
        var $ = cheerio.load(html);
        console.log('get how many images: ',$('img').length);
        console.log('get the img attr: ',$('img').attr());

        $('img').each(function (index,element) {
            list.push($(element).attr('src'));
        });

        console.log('list: ',list);

        console.log('current ', $('img').attr('src'));
    }
});