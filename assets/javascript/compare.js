$(document).ready(function(){
    //alert("working");

    // Initialize Firebase
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

    //$("#action-1").click(function(e){
        //do something
        //e.preventDefault();
       // });

    $("#submit-button").on("click", function(){
        $("#inputs").empty();
        var userKeyword = $("#keyword").val().trim();
        var locAdd = "austin"; //$("#loc-address");
        var locWithin = "10mi"; //$("#loc-within");
        var startDate = "this_month";//$("#start-date");
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
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);

                //dataB.ref().push(response);
                //var results = response.data();
                //console.log(results);

                var searchData = [];
                for (var i = 0; i < 10; i++) {

                        //searchData.push(searchID);
                        let name = searchData.push(response.events[i].name.text);
                        let startDateAndTime = searchData.push(response.events[i].start.local);
                        let venueName = searchData.push(response.events[i].venue.name);
                        let venueAddress = searchData.push(response.events[i].venue.address);                                     
                };
                dataB.ref().push(searchData);
            });


    });

})




//AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0 - Google APIKey