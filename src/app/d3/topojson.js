(function(){
  function stateName(){
    console.log('hello');
  };

  console.log('hello from topojson');


  var width = 960;
  var height = 620;

  var svg = d3.select('body').append('svg')
            .attr('class', 'map')
            .attr('height', height)
            .attr('width', width);
  var projection = d3.geo.albersUsa().scale(1300).translate([width/1.5, height/2]);

  var path = d3.geo.path().projection(projection);

  d3.json('assets/newmap.json', function(err, us){
    if (err) return console.error(err);


    //draws the US outline
    for (i=0; i < us.features.length; i++){
      var stateName = us.features[i].properties.NAME;
      svg.insert('path', '.graticule')
       .datum( us.features[i])
       .attr('class', 'state')
       .attr('id', stateName)
       .attr('d', path)
       .on({
        click: function(){
          console.log($(this).attr('id'));
        }
       });

    }

    //draws state lines
    svg.insert('path', '.graticule')
      .datum(topojson.mesh(us, us.features, function(a, b){ return a !== b;}))
      .attr('class', 'state-boundry')

      .attr('d', path);


  });



})();

