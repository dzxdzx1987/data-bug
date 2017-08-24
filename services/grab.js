let superagent = require('superagent');
let cheerio = require('cheerio');
let grab = {
    doGrab : function (req, res, next) {
        superagent.get('https://cnodejs.org/')
            .end((err, sres) => {
                if (err) {
                    return next(err);
                }
                let $  = cheerio.load(sres.text);
                let items = [];
                $('#topic_list .topic_title').each((idx, element) => {
                    let $element = $(element);
                    items.push({
                        title: $element.attr('title'),
                        href: $element.attr('href')
                    });
                });
                res.json(items);
            });
    }
}
module.exports = grab;