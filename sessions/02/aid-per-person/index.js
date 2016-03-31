var countriesWithAidPerPerson = {};

_.each(gapminderData, function(datum) {
  var countryName  = datum['ODA aid per person (constant 2007 US$)'];
  var aidPerPerson = datum['2007'];

  countriesWithAidPerPerson[countryName] = aidPerPerson;
});

_.each(countriesWithAidPerPerson, function(oneCountryAidPerPerson, oneCountryName) {
  document.write('<svg height="200" width="200">');
  document.write('  <text x="0" y="15">' + oneCountryName + ' ($' + Math.ceil(oneCountryAidPerPerson) + ')</text>');
  document.write('  <circle cx="50" cy="50" r="'+ Math.ceil(oneCountryAidPerPerson/25) + '" stroke="black" stroke-width="3" fill="purple" />');
  document.write('</svg>');
});
