const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Import .env file
require('dotenv').config();

const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient(process.env.BITLY_CLIENT_ACCESS_TOKEN);
app.use(bodyParser.json());

app.post('/generate_short_url', function (rqst, res) {
    console.log('rqst.body ' + JSON.stringify(rqst.body))
    if (rqst.body && rqst.body.url && rqst.body.url.trim() != "") {
        bitly.shorten(rqst.body.url).then(response => {
            if (response && response.link) {
                res.send({
                    'short_url': response.link
                })
            } else {
                res.send({
                    'error': 'Short URL did not generated.'
                })
            }
        }).catch(err => {
            res.send({
                'err': err,
                "message": "New short url generated."
            })
        })
    } else {
        res.send({
            'error': 'URL not available.'
        })
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})