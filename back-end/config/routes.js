var express  = require('express');
var router   = express.Router();

var competitionsController  = require('../controllers/competitionsController');
var competitorsController = require('../controllers/competitorsController');

router.route('/competitions')
  .get(competitionsController.competitionsIndex)
  .post()

router.route('/competitions/:id')
  .get(competitionsController.competitionsShow)
  .put()
  .delete()

router.route('/competitors')
  .get(competitorsController.competitorsIndex)
  .post()

router.route('/competitors/:id')
  .get()
  .put()
  .delete()

module.exports = router;