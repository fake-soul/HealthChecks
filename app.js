var request = require('request'),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    async = require('async');

app.use(bodyParser());


app.get("/", function(req, res){
    async.map(req.body.urls, getURL, (error, result) => {
        res.send(result);
    });
});

var urls = [];
function getURL(url, callback) {
    request
        .get(url)
        .on('error', function(err) {
            callback(null, {"url": url, "errorCode": err.code});
        })
        .on('response', function(response) {
        callback(null, {"url": url, "statusCode": response.statusCode});
    });
}
function done(error, result) {
    res.send(result);
}

// PORT
app.listen(3000, function(){
    console.log("The Health Checker is online!");
});