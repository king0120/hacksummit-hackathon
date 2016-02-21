(function() {
    console.log('hello from topojson');

    var width = 960;
    var height = 620;
    var centered;
    var stateSelect;
    var pollInfo = {};

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
            svg.insert('path', '.graticule')
                .datum(us.features[i])
                .attr('class', 'state')
                .attr('id', stateName)
                .attr('d', path)
                .on({
                    click: function() {
                        stateSelect = $(this).attr('id');
                        console.log(stateSelect);
                        huffApi(stateSelect);
                        clicked;
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

            $('h3').text(pollInfo.title);
            $('h6').empty();
            $.each(pollInfo.candidates, function(index, candidate) {
                console.log(candidate);
                $('h6').append('<span><strong>' + candidate.choice + '</strong> ' + candidate.value + '%</span>   ');

            });
        }
    };

    function huffApi(stateSelect) {
        // we need to add a function that will take stateSelect and convert to initials ("Georgia" => "ga") to pass into the api call. Right now we're only pulling "ga"
        console.log(stateSelect);
        stateInitials = stateSelect;

        // if (stateSelect == "Georgia") {
        //     stateInitials = "ga";
        // } else if (stateSelect == "Texas") {
        //     stateInitials = "tx";
        // } else if (stateSelect == "Virginia") {
        //     stateInitials = "va";
        // } else {
        //     stateInitials = "ca";
        // }
        $.ajax({
            url: "https://elections.huffingtonpost.com/pollster/api/charts.json?callback=pollsterChart&state=" + stateInitials + "&topic=2016-president-dem-primary",
            type: "GET",
            dataType: 'script',
            cache: true,
        });
    }
    // //draws state lines
    // g.insert('path', '.graticule')
    //     .datum(topojson.mesh(us, us.features, function(a, b) {
    //         return a !== b;
    //     }))
    //     .attr('class', 'state-boundry')

    // .attr('d', path);

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

        g.selectAll('path').classed('active', centered && function(d) {
            return d === centered;
        });
        g.transition().duration(1000).attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + "," + -y + ")")
            .style('stroke-width', 1.5 / k + 'px');

    }



})();
