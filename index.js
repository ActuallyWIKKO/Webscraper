// This does work but I need to look into it more to recreate the behavior I want.
// To use this run npm run start (install dependencies first)
// To use this as an API endpoint point your application to http://localhost:3000/api/articles
// WIKKO

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const PORT = 3000;
const cors = require('cors');
const app = express();
app.use(cors());

const url = 'http://wir-sind-pflege.blog'; 

app.get('/api/articles', async (req, res) => {
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $('article', html).each(function() {
        const title = $(this).find('h2').text();
        const link = $(this).find('.entry-title a').attr('href');
        const author = $(this).find('span a').text();
        const excerpt = $(this).find('.zl_content p em').text();
        const titleimg = $(this).find('.zl_postthumb a').attr('href');
        articles.push({
            title: title,
            link: link,
            author: author,
            excerpt: excerpt,
            titleimg: titleimg
        })
    })
    res.json(articles);
    }).catch(error => {
        console.log(error);
    });
});
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`));