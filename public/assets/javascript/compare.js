/*$(document).ready(function () {

    var ready = function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0&libraries=places&callback=initMap';
        script.text = 'async defer'

        document.body.appendChild(script);
    }
    ready();
});*/

function initMap() {
    var austin = {
        lat: 30.2672,
        lng: -97.7431
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: austin,
        zoom: 12
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: austin,
        radius: 1000000,
        type: ['music']
    }, callback);
}
$(document).ready(function () {
    //alert("working");

    /*You code */
    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // 
    //$("#submit-button").on("click", function () {

    function getLocationData(click) {
        eventListener('#submit-button', 'click', function () {
            var LocationData = JSON.parse(localStorage.getItem('location'));
            console.log(localStorage.eventLoc);
        });
    };

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);

            }
        }
    };

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location

        });
        //console.log(place.geometry);
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    };
    //});


});



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
var searchCounter = 0;


//$("#action-1").click(function(e){
//do something
//e.preventDefault();
// });


$("#submit-button").on("click", function () {

    $("#inputs").empty();
    var userKeyword = $("#keyword").val().trim();
    var locAdd = "austin"; //$("#loc-address");
    var locWithin = "10mi"; //$("#loc-within");
    var startDate = "this_month"; //$("#start-date");
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
        })
        .then(function (response) {
            console.log(response, map);

            //dataB.ref().push(response);
            //var results = response.data();
            //console.log(results);

            var searchDataLong = [];
            var searchDataLat = [];
            let googleinput = [];

            for (var i = 0; i < response.events.length; i++) {
                let thisEvent = response.events[i];

                var marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(thisEvent.venue.address.latitude),
                        lng: parseFloat(thisEvent.venue.address.longitude)
                    },
                    label: "Marker",
                    map: map,
                    title: 'Hello World!'
                });


                /*let item = {
                    name: response.events[i].name.text,
                    startDateAndTime: response.events[i].start.local,
                    venueName: response.events[i].venue.name,
                    venueAddress: response.events[i].venue.address,
                }
                let location = {
                    latitude: response.events[i].venue.address.latitude,
                    longitude: response.events[i].venue.address.longitude,
                }*/




                //console.log(localStorage.eventLoc.location);

                //searchData.push(item);
                // googleInput.push(location);
                //console.log(location);

            };
            //dataB.ref().push(searchData);
        });

    /* function getGoogleData {
            var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + userKeyword +
            "&location.address=" + locAdd +
            "&location.within=" + locWithin +
            "&start_date.keyword=" + startDate +
            "&token=Y54FW5RHAXG43FRWR4QJ&expand=venue";
            //console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {


                    
        }*/



    //dataB.ref().on('value', function snapshotToArray(childSnapshot) {
    //  console.log(childSnapshot);
    //let returnArr = [];

    //childSnapshot.forEach(function(childSnapshot) {
    //  var displayItem = childSnapshot.val();
    //displayItem.key = childSnapshot.key;

    //returnArr.push(displayItem);

    //});
    //console.log(returnArr);
    //return returnArr;

    //});


});


//for (var i = 0; i < 10; i++) {

//$("#search-results").append("<ul><li>" + returnArr[i].name + "</li><li>" + returnArr[i].startDateAndTime + "</li><li>" + returnArr[i].venueName +  "</li><li>" + returnArr[i].venueAddress + "</li></ol>");
//}
//AIzaSyDdHwuSi6AbQZbktOwjTx4Nz3kINmLI2fw


//AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0 - Google APIKey

//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/output?parameters


/*var urlPlaces = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDdHwuSi6AbQZbktOwjTx4Nz3kINmLI2fw";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
>>>>>>> f3754ce545faaa7b8379f0aed548f1bbe5e8f40b

});*/