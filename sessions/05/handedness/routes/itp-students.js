var express = require('express');
var router = express.Router();

var pg = require('pg');

router.get('/new', function(req, res, next) {
  res.render('itp-students/new', { title: 'Insert New ITP Student Record' });
});

router.post('/', function(req, res) {

  var itpStudentsDatum = {
    name:       req.body.name,
    handedness: req.body.handedness
  };

  var insertStatment = "INSERT INTO itp_students (name, handedness) VALUES ('" + itpStudentsDatum.name + "', '" + itpStudentsDatum.handedness + "')";
  console.log(insertStatment);

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(insertStatment, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.redirect('/itp-students');
    });
  });
});

router.get('/', function(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM itp_students', function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows);

      var itpStudentData = result.rows;
      
      res.render('itp-students/index', {
        _: require('underscore'),

        title: "A Sample of ITP Students' Handedness",
        itpStudentData: itpStudentData });
    });
  });
});


module.exports = router;
