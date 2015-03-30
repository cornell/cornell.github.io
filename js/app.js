module.exports = function(global, movies){
    "use strict";
    
    var tickets = [];

    global.showMovies = function(){

        movies.forEach(function(m){
            console.log(m.id + ') ' + m.name + ' | $' + m.price.toFixed(2));
        });
    };

    global.buyTicket = function(id){

        id = id || 0;
        id -= 1;

        if(movies[id] !== undefined){
            tickets.push(id);
            console.log('You bought a ticket for "' + movies[id].name + '"!');
        }
        else{
            console.error('No such movie!');
        }
    };

    global.showTickets = function(){

        tickets.forEach(function(id){
            console.log('Ticket for "' + movies[id].name + '" | $' + movies[id].price.toFixed(2));
        });

    };

    global.totalCost = function(){

        var total = 0;

        tickets.forEach(function(id){
            total += movies[id].price;
        });

        console.log('You have to pay $' + total.toFixed(2));
    };
};