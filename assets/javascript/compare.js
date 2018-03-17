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
        searchRadius = $("#mile-input").val().trim();
        date = $("#date-input").val().trim();
       // time = $("#time-input").val().trim(); Needed? May have range of times for whole day. - JD
       // eventName = $("#event-input").val().trim(); Needed? May pull event name from API.  - JD

       dataB.ref().push({
           searchRadius: searchRadius,
           date: date
       })

    })


})




//AIzaSyCttHUx3kXeV6l4jUMIw8jL5ZhrNhafsO0 - Google API Key