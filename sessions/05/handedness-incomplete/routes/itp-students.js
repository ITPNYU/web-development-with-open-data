var express = require('express');
var router = express.Router();

var pg = require('pg');

router.get('/new', function(req, res, next) {
  res.render('itp-students/new', { title: 'Insert New ITP Student Record' });
});

router.post('/', function(req, res) {
  console.log(req.body);

  var itpStudentsDatum = req.body;
  var insertStatment = "INSERT INTO itp_students (name, handedness) VALUES ('" + itpStudentsDatum.name + "', '" + itpStudentsDatum.handedness + "')";
  console.log(insertStatment);
  res.redirect('/itp-students');
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
      res.render('itp-students/index', { title: "A Sample of ITP Students' Handedness" });
    });
  });
});


module.exports = router;
