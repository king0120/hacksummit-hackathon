(function() {
    console.log('hello from topojson');


    var width = 960;
    var height = 620;
    var centered;

    var svg = d3.select('body').append('svg')
        .attr('class', 'map')
        .attr('height', height)
        .attr('width', width);


  var g = svg.append('g');

    var projection = d3.geo.albersUsa().scale(1300).translate([width / 1.5, height / 2]);

    var path = d3.geo.path().projection(projection);

    d3.json('assets/newmap.json', function(err, us) {
        if (err) return console.error(err);


        //draws the US outline
        for (i = 0; i < us.features.length; i++) {
            var stateName = us.features[i].properties.NAME;
            g.insert('path', '.graticule')
                .datum(us.features[i])
                .attr('class', 'state')
                .attr('id', stateName)
                .attr('d', path)
                .on({
                  click: function(){
                    console.log(this.css());
                    $(this).css('fill', 'green');
                  }
                })
                .on({
                    click: clicked,
                });

        }

        //draws state lines
        g.insert('path', '.graticule')
            .datum(topojson.mesh(us, us.features, function(a, b) {
                return a !== b;
            }))
            .attr('class', 'state-boundry')

        .attr('d', path);

    });

    function clicked(d) {
        var x, y, k;
        console.log(d);
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

      g.selectAll('path').classed('active', centered && function(d){return d===centered;});
      g.transition().duration(1000).attr('transform', 'translate(' + width/2 + ',' + height/2 +')scale('+k+')translate('+ -x + "," + -y + ")")
      .style('stroke-width', 1.5/k + 'px');

    }

})();
