d3.csv('/tips.csv', function(data) {
  var tippingDataByPartySize = _.groupBy(data, 'size');
  //console.log(tippingDataByPartySize);

  var meanTipByPartySize = {};

  _.each(tippingDataByPartySize, function(tippingDataForOnePartySize, partySize) {
    var tipsByPartySize = _.map(
      _.pluck(tippingDataForOnePartySize, 'tip'), function(string) {
        return Number(string);
    });

    var tipsSum = tipsByPartySize.reduce(function(a,b) {
      return a + b;
    })

    meanTipByPartySize[partySize] = tipsSum / tippingDataForOnePartySize.length;
  });

  console.log(meanTipByPartySize);

  _.each(meanTipByPartySize, function(meanTipAmount, partySize) {

    var svgContainer = d3.select('#dataviz').append('svg')
                                            .attr('width', 200)
                                            .attr('height', 200);

    svgContainer.append('text')
                .attr('x', 10)
                .attr('y', 15)
                .text('Party size: ' + partySize);

    svgContainer.append('ellipse')
                .attr('cx', 50)
                .attr('cy', 55)
                .attr('rx', meanTipAmount*8)
                .attr('ry', meanTipAmount*6)
                .style('fill', 'green');

  svgContainer.append('text')
              .attr('x', 30)
              .attr('y', 110)
              .text('$' + meanTipAmount.toFixed(2));
  });
});
