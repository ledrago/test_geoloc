var path = require('path');
var express = require('express');

module.exports = function(app) {
    require('./users/UserController')(app);

    app.get('*', function(req, res) {
        res.sendFile(path.resolve('../Projet_RunningHeroes/client/index.html'));
    })
}