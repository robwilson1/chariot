var express  = require('express');
var router   = express.Router();

var competitionsController  = require('../controllers/competitionsController');
var competitorsController = require('../controllers/competitorsController');

router.route('/competitions')
  .get(competitionsController.competitionsIndex)
  .post(competitionsController.competitionsCreate)

router.route('/competitions/:id')
  .get(competitionsController.competitionsShow)
  .put(competitionsController.competitionsUpdate)
  .delete(competitionsController.competitionsDelete)

router.route('/competitors')
  .get(competitorsController.competitorsIndex)
  .post(competitorsController.competitorsCreate)

router.route('/competitors/:id')
  .get(competitorsController.competitorsShow)
  .put(competitorsController.competitorsUpdate)
  .delete(competitorsController.competitorsDelete)

module.exports = router;