var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/contact-us', function(req, res, next) {
  res.render('contactus', { title: 'Express' });
});

router.get('/jobs', function(req, res, next) {
  res.render('jobs', { title: 'Express' });
});

router.get('/countries', function(req, res, next) {
  res.render('countries', { title: 'Express' });
});


router.get('/visa', function(req, res, next) {
  res.render('visa', { title: 'Express' });
});


router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Express' });
});

module.exports = router;
