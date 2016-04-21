var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('itp-students/new', { title: 'Insert New ITP Student Record' });
});

router.post('/', function(req, res) {
  console.log(req.body);
  res.redirect('/itp-students');
});

router.get('/', function(req, res, next) {
  res.render('itp-students/index', { title: "A Sample of ITP Students' Handedness" });
});


module.exports = router;
