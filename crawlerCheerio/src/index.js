const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const path = require('path');

request('https://g1.globo.com/', function (err, res, body) {
  if (!err && res.statusCode === 200) {
    let $ = cheerio.load(body)
    let news = []

    $('.feed-post').each((i, el) => {
      subtitle = $(el).find('.feed-post-header-chapeu').text()
      title = $(el).find('.feed-post-link').text()
      linkImage = $(el).find('.bstn-fd-picture-image').attr('src')
      subtItens = $('.bstn-relateditems .bstn-relateditem').find('a').html()
      hour = $(el).find('.feed-post-datetime').html()
      where = $(el).find('.feed-post-metadata-section').text().trim()
      metadata = `${hour} - ${where}`

      news.push({
        linkImage,
        subtitle,
        title,
        subtItens,
        metadata
      })
  
      fs.writeFileSync(path.resolve(__dirname, 'newsG1.json'), JSON.stringify({news}, null, '\t'));
      console.log(news)
    })
  }
})



