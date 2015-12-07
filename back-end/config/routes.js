var express  = require('express');
var router   = express.Router();

var competitionsController  = require('../controllers/competitionsController');
var teamsController = require('../controllers/teamsController');

router.route('/competitions')
  .get(competitionsController.competitionsIndex)
  .post(competitionsController.competitionsCreate)

router.route('/competitions/:id')
  .get(competitionsController.competitionsShow)
  .put(competitionsController.competitionsUpdate)
  .delete(competitionsController.competitionsDelete)

router.route('/teams')
  .get(teamsController.teamsIndex)
  .post(teamsController.teamsCreate)

router.route('/teams/:id')
  .get(teamsController.teamsShow)
  .put(teamsController.teamsUpdate)
  .delete(teamsController.teamsDelete)

module.exports = router;