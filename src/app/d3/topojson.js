(function(){
  console.log('hello from topojson');


  var width = 960;
  var height = 620;

  var svg = d3.select('body').append('svg')
            .attr('class', 'map')
            .attr('height', height)
            .attr('width', width);
  var projection = d3.geo.albersUsa().scale(1300).translate([width/1.5, height/2]);

  var path = d3.geo.path().projection(projection);

  d3.json('assets/usCounties.json', function(err, us){
    if (err) return console.error(err);
    console.log(us);


    // //draws the US outline
    // svg.insert('path', '.graticule')
    //    .datum(topojson.feature(us, us.objects.land))
    //    .attr('class', 'land')
    //    .attr('d', path);

});
  //   //draws the borders of the districts
  //   svg.insert('path', '.graticule')
  //      .datum(topojson.mesh(us, us.objects.counties, function(a, b){return a!==b && !(a.id/1000 ^ b.id/1000);}))
  //      .attr('class', 'county-boundary')
  //      .attr('d', path);

  //   //draws each district and gives it a class of district
  //    svg.selectAll("path")
  //      .data(topojson.feature(us, us.objects.counties).features)
  //      .enter().append("path")
  //      .attr('class', 'district')
  //      .attr('d', path);

  //   //draws state lines
  //   svg.insert('path', '.graticule')
  //     .datum(topojson.mesh(us, us.objects.states, function(a, b){ return a !== b;}))
  //     .attr('class', 'state-boundry')
  //     .attr('d', path);


  //   svg.selectAll("path")
  //      .data(topojson.feature(us, us.objects.states).features)
  //      .enter().append("path")
  //      .attr('class', 'state')
  //      .attr('d', path);

  //   //transition for click zoom
  //   svg.transition().duration(1000)
  //      .call(zoom)
  //      .call(zoom.event);
  // });

  d3.json('assets/newmap.json', function(err, us){
    if (err) return console.error(err);
    console.log(us.features[0]);


    //draws the US outline
    console.log(topojson.feature(us, us.features[0]));
    for (i=0; i < us.features.length; i++){
      svg.insert('path', '.graticule')
       .datum( us.features[i])
       .attr('class', 'state')
       .attr('id', us.features[i].properties.NAME)
       .attr('d', path);

      console.log(us.features[i].properties.NAME);

    }


  //   //draws the borders of the districts
  //   svg.insert('path', '.graticule')
  //      .datum(topojson.mesh(us, us.objects.counties, function(a, b){return a!==b && !(a.id/1000 ^ b.id/1000);}))
  //      .attr('class', 'county-boundary')
  //      .attr('d', path);

  //   //draws each district and gives it a class of district
  //    svg.selectAll("path")
  //      .data(topojson.feature(us, us.objects.counties).features)
  //      .enter().append("path")
  //      .attr('class', 'district')
  //      .attr('d', path);

    //draws state lines
    svg.insert('path', '.graticule')
      .datum(topojson.mesh(us, us.features, function(a, b){ return a !== b;}))
      .attr('class', 'state-boundry')
      .attr('d', path);


  //   svg.selectAll("path")
  //      .data(topojson.feature(us, us.objects.states).features)
  //      .enter().append("path")
  //      .attr('class', 'state')
  //      .attr('d', path);

  //   //transition for click zoom
  //   svg.transition().duration(1000)
  //      .call(zoom)
  //      .call(zoom.event);
  });

})();

