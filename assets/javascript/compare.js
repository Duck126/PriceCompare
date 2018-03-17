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
    


    $(".searchBtn").on("click", function(){
        //searchRadius = $("#mile-input").val().trim();
        //date = $("#date-input").val().trim();
       // time = $("#time-input").val().trim(); Needed? May have range of times for whole day. - JD
       // eventName = $("#event-input").val().trim(); Needed? May pull event name from API.  - JD


   
        $("#inputs").empty();
        var userKeyword = $("#keyword").val().trim();
        var locAdd = $("#loc-address");
        var locWithin = $("#loc-within");
        var startDate = $("#start-date");
        var queryURL = "https://www.eventbriteapi.com/v3/events/search/?q=" + userKeyword
        "&location.address=" + locAdd
        "&location.within=" + locWithin
        "&start_date.keyword=" + startDate
        "&token=Y54FW5RHAXG43FRWR4QJ&expand=venuee";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);

                var results = response.data;



       dataB.ref().push({
           searchRadius: searchRadius,
           date: date
       })

    })


})




//AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0 - Google API Key