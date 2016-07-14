$(function() {


    new GMaps({
        div: '#map',
        lat: 35.5951,
        lng: -82.5515,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoom: 9

    });

    var openWeatherMapKey = "d7fe524de6497aad8bf77c0978b4b3af";

    $('#searchTerm').submit(function(event) {
        event.preventDefault();

        var spot = $('#pac-input').val();
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + spot + '&appid=' + openWeatherMapKey, showWeather, function(data) {
            console.log(data);

             $("#data-current").text('Sky: ' + data.weather[0].description);
             var temperm = Math.round((data.main.temp_max -273.15))
             var temper = Math.round((data.main.temp-273.15))
             var temperi = Math.round((data.main.temp_min-273.15))
             $("#data-temp_max").html('Max-Temp: ' + temperm + '&deg;');
            $("#data-temp").html('Temp: ' + temper + '&deg;');
            $("#data-temp_min").html('Min-Temp: ' + temperi + '&deg;');
            $("#data-humidity").text('Humidity: ' + data.main.humidity + '%');
            $("#data-wind").text('Wind: ' + data.wind.speed + 'mph');
            $("#data-gust").text('Gusts: ' + data.wind.gust + 'mph');
            $("#data-angle").html('Direction: ' + data.wind.deg + '&deg;');
            var img = "<img src='http://openweathermap.org/img/w/"+ data.weather[0].icon +".png'>"
            $("#data-percipitation").html('Percipitation: ' + img);
            var d = new Date(data.sys.sunrise*1000)
            var n = new Date(data.sys.sunset*1000)
            $("#data-sunrise").text('Sunrise: ' + d);
            $("#data-sunset").text('Sunset: ' + n);


            new GMaps({
                div: '#map',
                lat: data.coord.lat,
                lng: data.coord.lon,
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                zoom: 9

            });


        })

        var showWeather = function(data) {
    $("#test").text("I AM CHANGED. THANKS!")
    $("#temp").text(data.main.temp)
    $("#description").text(data.weather[0].description)
    $("#place").text(data.name)
};


    });

    /*
    function initAutocomplete() {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 35.5951,
                lng: -82.5515
            },
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        // weather stuff
        var endpoint = "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=d7fe524de6497aad8bf77c0978b4b3af";
        console.log('input', input.value);



        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    };
*/

    var windw = this;

    $.fn.followTo = function(pos) {
        var $this = this,
            $window = $(windw);

        $window.scroll(function(e) {
            if ($window.scrollTop() > pos) {
                $this.css({
                    position: 'absolute',
                    top: pos
                });
            } else {
                $this.css({
                    position: 'fixed',
                    top: 0
                });
            }
        });
    };

    $('#title').followTo(595);

});



//this is the openweatherapi//