var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');

router.get('/flights/:id/tickets/new', ticketsCtrl.new);
// router.delete('/flights/:id/:id', ticketsCtrl.delete);
router.post('/flights/:id', ticketsCtrl.create);

module.exports = router;