d3.csv('https://raw.githubusercontent.com/matthewfdaniels/scripts/graphs/character_list5.csv', function(data) {
  d3.csv('https://raw.githubusercontent.com/matthewfdaniels/scripts/graphs/meta_data7.csv', function(meta) {
    var scriptID = meta[0].script_id;
    var movieTitle = meta[0].title;

    var movieData = _.where(data, {script_id: scriptID});

    var femaleChars = _.where(movieData, {gender: 'f'});
    var maleChars = _.where(movieData, {gender: 'm'});

    function sumWords (arr) {
      return _.reduce(arr, function(memo, num) {
        return memo + parseFloat(num.words);
      }, 0);
    }

    var totalWords = sumWords(movieData);

    var chartData = [
      {gender: 'female', percWords: sumWords(femaleChars) / totalWords, textX: 0, 'text-anchor': 'start', color: 'purple'},
      {gender: 'male', percWords: sumWords(maleChars) / totalWords, textX: 400, 'text-anchor': 'end', color: 'green'}
    ];

    var svgContainer = d3.select('#dataviz').append('svg')
                                            .attr('width', 400)
                                            .attr('height', 150);

    var moiveTitleText = svgContainer.append('text')
                .attr('x', 0)
                .attr('y', 20)
                .text(movieTitle);

    var genderGroups = svgContainer.selectAll('g')
              .data(chartData, function(d, i) { return d.gender; }).enter()
                .append('g');

    genderGroups.append('text')
                .attr('x', function(d, i) { return d.textX; })
                .attr('y', 50)
                .attr('text-anchor', function(d, i) { return d['text-anchor']; })
                .text(function(d) { return d.gender.toUpperCase() + ' CHARACTERS'; });

    genderGroups.append('text')
                .attr('class', 'percWordsText')
                .attr('x', function(d, i) { return d.textX; })
                .attr('y', 70)
                .attr('text-anchor', function(d, i) { return d['text-anchor']; })
                .text(function(d) { return Math.round(d.percWords*100) + '% of words'; });

    genderGroups.append('rect')
                .attr('x', function(d, i) {
                  if (d.gender === 'female') {
                    return 0;
                  } else if (d.gender === 'male') {
                    return 400 - (400*d.percWords);
                  }
                })
                .attr('y', 80)
                .attr('width', function(d, i) { return 400*d.percWords; })
                .attr('height', 50)
                .attr('fill', function(d, i) { return d.color; });

    function update () {
      var randIndex = Math.floor(Math.random()*meta.length);

      scriptID = meta[randIndex].script_id;
      movieTitle = meta[randIndex].title;

      movieData = _.where(data, {script_id: scriptID});

      femaleChars = _.where(movieData, {gender: 'f'});
      maleChars = _.where(movieData, {gender: 'm'});

      totalWords = sumWords(movieData);

      chartData = [
        {gender: 'female', percWords: sumWords(femaleChars) / totalWords, textX: 0, 'text-anchor': 'start', color: 'purple'},
        {gender: 'male', percWords: sumWords(maleChars) / totalWords, textX: 400, 'text-anchor': 'end', color: 'green'}
      ];

      moiveTitleText.text(movieTitle);

      var join = genderGroups.data(chartData, function(d) { return d.gender; });

      join.select('.percWordsText')
          .text(function(d) { return Math.round(d.percWords*100) + '% of words'; });

      join.select('rect')
        .transition()
          .attr('x', function(d, i) {
            if (d.gender === 'female') {
              return 0;
            } else if (d.gender === 'male') {
              return 400 - (400*d.percWords);
            }
          })
          .attr('width', function(d, i) { return 400*d.percWords; });

    }

    d3.select('#randomButton')
      .on('click', update);

  })
});
