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
    }, function(){});
}

$(document).ready(function () {
    //alert("working");

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

    $("#submit-button").on("click", function(e){
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
        })
            .then(function (response) {
                //console.log(response, map);


                var searchData = [];
                let googleInput = [];
                let number = 0;
                var searchDataLong = [];
                var searchDataLat = [];
                let googleinput = [];

                for (var i = 0; i < 10; i++) {
                        
                            let item = {
                                name : response.events[i].name.text,
                                startDateAndTime : response.events[i].start.local,
                                venueName : response.events[i].venue.name,
                                venueAddress : response.events[i].venue.address, 
                            }

                            let location = {
                                latitude : response.events[i].venue.address.latitude,
                                longitude : response.events[i].venue.address.longitude,
                            }
                            
                            let time = moment(item.startDateAndTime).format("dddd, MMMM Do, h:mm a");
                            $("#list-anchor").append("<h4 id='list-item-" + number++ + "'>" + item.name + "</h4><p>" + time + "<br >" + item.venueName + "</p <hr>");
                            $("#list-display").append("<a style = 'margin-bottom:70px' class='list-group-item list-group-item-action' href='list-item-" + number + "'> event </a>");
                            console.log(number, "number");

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
            

                    console.log(item)  
                    searchData.push(item);
                    googleInput.push(location);
                    console.log(location);
                   
                };

                dataB.ref().push(searchData);
            });
    });
    
})



//AIzaSyDdHwuSi6AbQZbktOwjTx4Nz3kINmLI2fw
//AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0 - Google APIKey

//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/place/details/output?parameters
//*var urlPlaces = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDdHwuSi6AbQZbktOwjTx4Nz3kINmLI2fw";


                //dataB.ref().push(response);
                //var results = response.data();
                //console.log(results);