states = [];
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
        .attr('width', 400);


    var g = svg.append('g');

    var projection = d3.geo.albersUsa().scale(1000).translate([width / 1.5, height / 2]);

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
            states.push(stateName);
        }
    });

    window.pollsterChart = function(data) {
        pollInfo['title'] = data[0]['title'];
        pollInfo['candidates'] = [];

        var est = data[0]['estimates'];

        colorState(data, est);

        for (var i = 0; i < est.length; i++) {
            var candidate = {};
            candidate['choice'] = est[i]['choice']
            candidate['value'] = est[i]['value']

            pollInfo['candidates'].push(candidate);
        }

        console.log(pollInfo.candidates);

        // $('h3').text(pollInfo.title);
        $('h6').empty();
        $.each(pollInfo.candidates, function(index, candidate) {
            $('h6').append('<span><strong>' + candidate.choice + '</strong> ' + candidate.value + '%</span>   <br>');
        });
    };


    function huffApi(stateSelect) {
        //grabs user click on a state
        stateInitials = stateSelect;

        //updates call based on user selection of Dem or GOP
        var party = $('#party').text();
        console.log('party: ' + party + '. stateInitials: ' + stateInitials);
        $.ajax({
            url: "https://elections.huffingtonpost.com/pollster/api/charts.json?callback=pollsterChart&state=" + stateInitials + "&topic=2016-president-" + party + "-primary",
            type: "GET",
            dataType: 'script',
            cache: true,
        });
    }

    function clicked(d) {
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 3;
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

    function colorState(data, est) {
        //Color the State
        var currentLead = est[0].choice;
        console.log('colorState' + data[0]);
        if (currentLead === 'Clinton') {
            console.log('CLINTON');
            $('#' + data[0].state.toLowerCase()).css('fill', '#2BB8CD');
        } else if (currentLead === 'Sanders') {
            console.log('SANDERS');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#0D3DDB');
        } else if (currentLead === "Trump") {
            console.log('TRUMP');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#f00');
        } else if (currentLead === "Rubio") {
            console.log('RUBIO');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#f44');
        } else if (currentLead === "Cruz") {
            console.log('CRUZ');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#f88');
        } else if (currentLead === "Carson") {
            console.log('CARSON');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#faa');
        } else if (currentLead === "Huckabee") {
            console.log('HUCKABEE');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#fcc');
        } else if (currentLead === "Christie") {
            console.log('CHRISTIE');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#f36');
        } else if (currentLead === "Walker") {
            console.log('WALKER');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#e61873');
        } else if (currentLead === "Paul") {
            console.log('PAUL');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#f6137');
        } else {
            console.log('OTHER');
            console.log($('#' + data[0].state.toLowerCase()));
            $('#' + data[0].state.toLowerCase()).css('fill', '#A5F2FF');
        }

    }
    // setTimeout(function() {
    //     states.forEach(function(x) {
    //         $('#' + x).css('fill', 'darkslategrey');
    //         console.log('coloring ' + x);
    //         huffApi(x);
    //     });
    // }, 100);

})();
