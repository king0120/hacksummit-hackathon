(function(){
  function stateName(){
    console.log('hello');
  };

  console.log('hello from topojson');

  var stateSelect;
  var pollInfo = {};

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
          stateSelect = $(this).attr('id');
          console.log(stateSelect);
          huffApi(stateSelect);
        }
       });

    }

    //draws state lines
    svg.insert('path', '.graticule')
      .datum(topojson.mesh(us, us.features, function(a, b){ return a !== b;}))
      .attr('class', 'state-boundry')

      .attr('d', path);
  });

  function huffApi(stateSelect) {
    console.log("line 52" + stateSelect);

    stateInitials = "ga";

    $.get("http://elections.huffingtonpost.com/pollster/api/charts.json?state=" + stateInitials + "&topic=2016-president-dem-primary", function(data){

      pollInfo['title'] = data[0]['title'];
      pollInfo['candidates'] = [];

      var est = data[0]['estimates']
      
      for (var i = 0; i < est.length; i++){
        var candidate = {};
        candidate['choice'] = est[i]['choice']
        candidate['value'] = est[i]['value']

        pollInfo['candidates'].push(candidate);
      }

      console.log(pollInfo);
    })

  }

})();

