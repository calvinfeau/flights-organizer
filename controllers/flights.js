var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort(function(a, b) {return a.departs - b.departs});
        res.render('flights/index', {flights: flights})
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    if (req.body.departs === '') {
        req.body.departs = undefined 
    };
    var flight = new Flight(req.body);
    flight.save(function(err) {
        err ? 
        res.render('flights/new') : res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('tickets').exec(function(err, flight) {
        Ticket.find({_id: {$nin: flight.tickets}})
        .exec(function(err, tickets) {    
        res.render('flights/show', {flight, tickets});
        })
    })
}