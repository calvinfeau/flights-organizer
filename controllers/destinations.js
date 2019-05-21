var Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination
};

function create(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        if (req.body.arrival === '') {
            req.body.arrival = undefined
        };
        flight.destination.push(req.body);
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function deleteDestination(req, res) {
    console.log(req.params.destinationId);
    Flight.findById(req.params.flightId, function (err, flight) {
        flight.destination.id(req.params.destinationId).remove();
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`)
        });
    })
};
