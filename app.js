var request = require('request'),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    async = require('async');

app.use(bodyParser());

// TODO: DB or config file
var preURL = [
    "https://www.google.com",
    "https://www.fb.com",
    "https://www.myspace.com",
    "https://www.youtubve23434.com",
    "http://backend.foodstag.in/",
    "https://bharat.free.beeceptor.com/favicon.ico",
    "https://bharat.free.beeceptor.com/403",
    "https://bharat.free.beeceptor.com/503"
];

// TODO: without exposing route?
app.get("/", function(req, res) {
    // TODO: Modify contains to be sent to client
    async.map(preURL, getURL, (error, result) => {
        console.log(result);
        request({
            method: 'POST',
            uri: 'https://outlook.office.com/webhook/13e4e68f-3fd0-491b-8a69-0d13f460199a@46c96cbb-2537-4992-a9d5-e9f3ad1a06f5/IncomingWebhook/de904b92ba4d4e389049608e47ae243f/4d3c79c0-4794-4908-84ec-03469fb21c16',
            json: {
                "type": "message",
                "textFormat": "plain",
                "text": JSON.stringify(result)
            },
        }, (error, response, body) => {
            if(error) {
                console.log(error);
            }
            else{
                console.log("Sent to Client");
                setTimeout(function () {
                    res.redirect('/');
                }, 2000)
            }
        });
    });
})


app.get("/customURL", function(req, res){
    async.map(req.body.urls, getURL, (error, result) => {
        res.send(result);
    });
});

app.post("/addPreURL", function(req, res) {
    req.body.urls.forEach(element => {
        preURL.push(element);
    });
    res.send(preURL);
});

app.get("/showPREURL", function(req, res) {
    res.send(preURL);
});

var urls = [];
function getURL(url, callback) {
    request
        .get(url)
        .on('error', function(err) {
            callback(null, {"url": url, "errorCode": err.code});
        })
        .on('response', function(response) {
        callback(null, {"url": url, "statusCode" : response.statusCode});
    });
}
function done(error, result) {
    res.send(result);
}

// PORT
app.listen(3000, function(){
    console.log("The Health Checker is online!");
});