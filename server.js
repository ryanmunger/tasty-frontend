'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    port = 8001,
    liveReloadPort = 35729,
    router = express.Router(),
    app = express(),
    sendOptions = { root: 'dist' };

app.use(require('connect-livereload')({port: liveReloadPort}));

app.use(bodyParser.json());
app.use(express.static('./dist'));

router.get('/', function(req, res) {
    res.sendFile('/index.html', sendOptions)
});

app.listen(port, function () {
    console.log("Tasty running on %d", port);
});
