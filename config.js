var config = {}

config.urls = [
    "https://www.google.com",
    "https://www.fb.com",
    "https://www.myspace.com",
    "https://www.youtubve23434.com",
    "http://backend.foodstag.in/",
    "https://bharat.free.beeceptor.com/favicon.ico",
    "https://bharat.free.beeceptor.com/403",
    "https://bharat.free.beeceptor.com/503"
];

config.addURL = (newurl) => {
    config.urls.push(newurl);
}

module.exports = config;