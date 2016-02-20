(function(){
  console.log('hello from topojson');


  var width = 960;
  var height = 620;

  var svg = d3.select('body').append('svg')
            .attr('class', 'map')
            .attr('height', height)
            .attr('width', width);
  var projection = d3.geo.albersUsa().scale(1000).translate([width/2, height/2]);

  var path = d3.geo.path().projection(projection);

  d3.json('assets/usCounties.json', function(err, us){
    if (err) return console.error(err);

    svg.insert('path', '.graticule')
       .datum(topojson.feature(us, us.objects.land))
       .attr('class', 'land')
       .attr('d', path);

    svg.insert('path', '.graticule')
       .datum(topojson.mesh(us, us.objects.counties, function(a, b){return a!==b && a.id/1000 ^ b.id/1000;}))
       .attr('class', 'county-boundary')
       .attr('d', path);

    svg.insert('path', '.graticle')
      .datum(topojson.mesh(us, us.objects.states, function(a, b){ return a !== b;}))
      .attr('class', 'state-boundry')
      .attr('d', path);

  });
})();

