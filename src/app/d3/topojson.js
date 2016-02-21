(function() {
    console.log('hello from topojson');

    var width = 960;
    var height = 620;
    var stateSelect;
    var pollInfo = {};
    var centered;

    var svg = d3.select('body').append('svg')
        .attr('class', 'map')
        .attr('height', height)
        .attr('width', width);


    var g = svg.append('g');

    var projection = d3.geo.albersUsa().scale(1000).translate([width / 1.5, height / 2.6]);

    var path = d3.geo.path().projection(projection);

    d3.json('assets/newmap.json', function(err, us) {
        if (err) return console.error(err);
        //draws the US outline
        for (i = 0; i < us.features.length; i++) {
            var stateName = us.features[i].properties.NAME;
            g.insert('path', '.graticule')
                .datum(us.features[i])
                .attr('ng-click', 'd3.huffApi()')
                .attr('num', i)
                .attr('class', 'state show')
                .attr('id', stateName)
                .attr('d', path)
                .on({
                    click: function() {
                        stateSelect = $(this).attr('id');
                        huffApi(stateSelect);
                        clicked(us.features[$(this).attr('num')]);
                    }
                });

        }
    });

    window.pollsterChart = function(data) {
        //logic added for states with no data returned
        if (data.length === 0) {
            $('h3').text('Info coming soon!');
        } else {
            console.log(data);
            pollInfo['title'] = data[0]['title'];
            pollInfo['candidates'] = [];

            var est = data[0]['estimates'];

            for (var i = 0; i < est.length; i++) {
                var candidate = {};
                candidate['choice'] = est[i]['choice']
                candidate['value'] = est[i]['value']

                pollInfo['candidates'].push(candidate);
            }

            console.log(pollInfo.candidates);

            $('h1').text(pollInfo.title);
            $('h6').empty();
            $.each(pollInfo.candidates, function(index, candidate) {
                console.log(candidate);
                $('h6').append('<span><strong>' + candidate.choice + '</strong> ' + candidate.value + '%</span>   ');

            });
        }
    };


    function huffApi(stateSelect) {
        //grabs user click on a state
        stateInitials = stateSelect;

        //updates call based on user selection of Dem or GOP
        var party = $('#party').text();

        $.ajax({
            url: "https://elections.huffingtonpost.com/pollster/api/charts.json?callback=pollsterChart&state=" + stateInitials + "&topic=2016-president-" + party + "-primary",
            type: "GET",
            dataType: 'script',
            cache: true,
        });
    }

    function clicked(d) {
        console.log(d);
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            console.log(centroid);
            x = centroid[0];
            y = centroid[1];
            k = 3;
            centered = d;
        } else {
            console.log('else');
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }
        g.selectAll('path').classed('active', centered && function(d) {
            return d === centered;
        });
        g.transition().duration(1000).attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + "," + -y + ")")
            .style('stroke-width', 1.5 / k + 'px');
    }
})();
