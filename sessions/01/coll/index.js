var data = socrataResponse['data'];

var countsByBorough = _.countBy(data, function(datum) {
  var boroughName = datum[10];

  return boroughName;
});

_.each(countsByBorough, function(oneBoroughCount, oneBoroughName) {
  var bar = new String;

  _.times(Math.ceil(oneBoroughCount/3), function() {
    bar += 'X';
  });

  document.write(oneBoroughName + "<br>" + bar + "<br><br>");
});
