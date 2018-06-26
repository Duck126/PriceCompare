function initMap() {
    var austin = {
        lat: 30.2672,
        lng: -97.7431
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: austin,
        zoom: 12,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8ec3b9"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1a3646"
                }]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#64779e"
                }]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#334e87"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#6f9ba5"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#3C7680"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#304a7d"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2c6675"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#255763"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#b0d5ce"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#023e58"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#283d6a"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#3a4762"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#0e1626"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#4e6d70"
                }]
            }
        ]
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: austin,
        radius: 1000000,
        type: ['music']
    }, function () {});
};



$(document).ready(function (initMap) {
    //alert("working");
    initMap();

    var config = {
        apiKey: "AIzaSyBNSBALDx4nwVVXPZmiHCgC3_Nvvbg-Vc8",
        authDomain: "price-compare-project-73cd9.firebaseapp.com",
        databaseURL: "https://price-compare-project-73cd9.firebaseio.com",
        projectId: "price-compare-project-73cd9",
        storageBucket: "price-compare-project-73cd9.appspot.com",
        messagingSenderId: "1037112672846"
    };
    firebase.initializeApp(config);

    var dataB = firebase.database();
    var searchData = [];

    $("#submit-button").on("click", function (e, map) {
        e.preventDefault();
        $("#inputs").empty();
        var userKeyword = $("#keyword").val().trim();
        var locAdd = $("#loc-address").val().trim();

        $("#1mi").val("1mi");
        $("#5mi").val("5mi");
        $("#10mi").val("10mi");
        $("#20mi").val("20mi");

        $("#today").val("today");
        $("#tomorrow").val("tomorrow");
        $("#this-week").val("this_week");
        $("#next-week").val("next_week");
        $("#this-month").val("this_month");
        $("#next-month").val("next_month");


        var locWithin = $("#loc-with").val();
        var startDate = $("#start-date").val();

        console.log("kw", userKeyword);
        console.log("loca", locAdd);
        console.log("locw", locWithin);
        console.log("date", startDate);

        //you can test this URL by actually going to it https://www.eventbriteapi.com/v3/events/search/?q=crawfish+boil&location.address=austin&location.within=10mi&start_date.keyword=this_month&token=Y54FW5RHAXG43FRWR4QJ&expand=venue
        //the above is an example, feel free to play around with it. their api is cool.
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + userKeyword +
            "&location.address=" + locAdd +
            "&location.within=" + locWithin +
            "&start_date.keyword=" + startDate +
            "&token=Y54FW5RHAXG43FRWR4QJ&expand=venue";
        //console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log(map);

            let googleInput = [];
            let number = 0;
            var searchDataLong = [];
            var searchDataLat = [];
            let googleinput = [];

            for (var i = 0; i < 11; i++) {

                var item = {
                    name: response.events[i].name.text,
                    startDateAndTime: response.events[i].start.local,
                    venueName: response.events[i].venue.name,
                    venueAddress: response.events[i].venue.address,
                };

                var location = {
                    latitude: response.events[i].venue.address.latitude,
                    longitude: response.events[i].venue.address.longitude,
                };

                console.log(location);

                //console.log(item);
                //console.log(searchData);

                let time = moment(item.startDateAndTime).format("dddd, MMMM Do, h:mm a");
                $("#list-anchor").append("<h4 id='list-item-" + number++ + "'>" + item.name + "</h4><p>" + time + "<br >" + item.venueName + "</p <hr>");
                $("#list-display").append("<a class='list-group-item list-group-item-action' href='list-item-" + number + "'> event </a>");

                //console.log(number, "number");

                let thisEvent = response.events[i];

                console.log(thisEvent);

                // Standard google maps function
                // function initialize() {
                //     var myLatlng = new google.maps.LatLng(40.779502, -73.967857);
                //     var myOptions = {
                //         zoom: 12,
                //         center: myLatlng,
                //         mapTypeId: google.maps.MapTypeId.ROADMAP
                //     }
                //     map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                // }

                // // Function for adding a marker to the page.
                // function addMarker(location) {
                //     marker = new google.maps.Marker({
                //         position: location,
                //         map: map
                //     });
                // }

                // // Testing the addMarker function
                // CentralPark = new google.maps.LatLng(37.7699298, -122.4469157);
                // addMarker(CentralPark);

                    var latt = parseFloat(location.latitude);
                    var long = parseFloat(location.longitude);

                function addMarker(latt, long, map) {
                    marker = new google.maps.Marker({
                        position: {
                            lat: latt,
                            lng: long
                            // lat: parseFloat(thisEvent.venue.address.latitude),
                            // lng: parseFloat(thisEvent.venue.address.longitude)
                        },
                        setMap: map
                    });
                };

                var mapMarkers = new google.maps.LatLng(latt, long);

                addMarker(latt, long, map);

                // var marker = new google.maps.Marker({
                //     position: {
                //         lat: parseFloat(thisEvent.venue.address.latitude),
                //         lng: parseFloat(thisEvent.venue.address.longitude)
                //     },

                //     label: JSON.stringify(number),
                //     map: map,
                //     title: 'Hello World!'

                // });

                searchData.push(item);
                googleInput.push(location);

            };
            dataB.ref().push(searchData);

        });

    });

});