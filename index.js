'use strict'
var https = require('https');
var http = require('http');
var options = {
    host: 'forecast.weather.gov',
    path: '/MapClick.php?lat=38.4247341&lon=-86.9624086&FcstType=json'
}

var main = function(){
    //obtain weather data from host/path.
    var noaa = getNoaaData(function(err, data){
        if(err){
            console.log('something happened that is not that great!');
            return err;
        }

        console.log(data);
    });
}

function getNoaaData(callback){
    http.get(options, function(res) {
        var body = '';
        res.on('data', function(responseBody){
            body += responseBody;
        });

        res.on('end', function() {
            console.log(body);
            var parsed = JSON.parse(body);
            callback(null, parsed);
        });

        res.on('error', function(err) {
            callback(err);
        });
    });
}

if(require.main == module){
    main();
}