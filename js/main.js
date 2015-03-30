(function(){
    "use strict";

    // Require the superagent library
    var request = require('superagent');

    // Require our own module
    var app = require('./app.js');

    // Send a GET AJAX request
    request('assets/movies.json', function(res){

        if(res.ok){
            // Initialize the API
            app(window, res.body.movies);
        }
        else{
            throw new Error('An AJAX error occured: ' + res.text);
        }

    });
    
})();