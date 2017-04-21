'use strict'
var http = require('http');
var lat = Math.floor(Math.random() * 90) * (Math.random() < 0.5 ? -1 : 1);
var long = Math.floor(Math.random() * 180) * (Math.random() < 0.5 ? -1 : 1);

var main = function(){
    console.log('lat: ' + lat + '   long: ' + long);
    var x = getForecast(lat, long, function(err, data) {
        if(err){
            console.log(err);
        }
        console.log(data);
    });
}

function getForecast(lat, long, callback){
    var options = {
        host: 'forecast.weather.gov',
        path: '/MapClick.php?lat=40.77&lon=-73.94&FcstType=json',
        headers: {'user-agent': 'NewApp/5.0'}   
    }

    http.get(options, function(res) {
        var body = '';
        res.on('data', function(responseBody){
            body += responseBody;
        });

        res.on('end', function() {
            try{
                var parsed = JSON.parse(body);
                callback(null, parsed.currentobservation);
            } 
            catch(e){
                callback(e);
            }
        });

        res.on('error', function(err) {
            callback(err);
        });
    });
}

if(require.main == module){
    main();
}