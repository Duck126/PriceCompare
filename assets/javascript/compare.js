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
<<<<<<< HEAD
=======
    var searchCounter = 0;
    var eventFull = $("#eventFull");
>>>>>>> f3754ce545faaa7b8379f0aed548f1bbe5e8f40b

    //$("#action-1").click(function(e){
        //do something
        //e.preventDefault();
       // });

<<<<<<< HEAD
    $("#submit-button").on("click", function(){
=======

    eventFull.signIn = function () {
        var email = eventFull.email;
        var pass = eventFull.password;
        if (!email || !pass) {
            return console.log('email and password required');

        }

        firbase.auth().signInWithEmailAndPassword(email, pass)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("sign in error", error);
            });
    };

    eventFull.register = function () {
        var email = eventFull.email;
        var pass = eventFull.password;

        if (!email || !pass) {
            return console.log("email and password required");

        }

        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .catch( function(error){
            console.log('register error', error);
            if (error.code === 'auth/email-already-in-use') {
                var credential = firebase.auth.EmailAuthProvider.credential(email, pass);

                eventFull.signInWithGoogle()
                .then(function(){
                    firebase.auth().currentUser.link(credential)
                        .then(function(user){
                            console.log('Account Linking success', user);
                        }, function(error) {
                            console.log("Account linking error", error);
                        });
                    });
              }
            });
        
                
       
    };

    eventFull.signInWithGoogle = function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        return firebase.auth().signInWithPopup(provider)
        .catch(function(error){
            console.log('Google Sign In error', error);
        });
    };

    eventFull.signOut = function(){
        firebase.auth().signOut();
    };

    firebase.auth().onAuthStateChanged(function(user){
        eventFull.user = user;
        console.log('user', user);
    });


    $(".searchBtn").on("click", function () {
        //searchRadius = $("#mile-input").val().trim();
        //date = $("#date-input").val().trim();
        // time = $("#time-input").val().trim(); Needed? May have range of times for whole day. - JD
        // eventName = $("#event-input").val().trim(); Needed? May pull event name from API.  - JD



>>>>>>> f3754ce545faaa7b8379f0aed548f1bbe5e8f40b
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
            .then(function (response) {
                console.log(response);

                //dataB.ref().push(response);
                //var results = response.data();
                //console.log(results);

                var searchData = [];

                for (var i = 0; i < 10; i++) {
                        
                            var item = {
                            name : response.events[i].name.text,
                            startDateAndTime : response.events[i].start.local,
                            venueName : response.events[i].venue.name,
                            venueAddress : response.events[i].venue.address, 
                        }   
                        searchData.push(item);
                               
                };
                dataB.ref().push(searchData);
            });

            //var ref = dataB.ref();
            //ref.on('value', gotData);

            //function gotData(data) {
              //  var name = 
            //}


            dataB.ref().on('value', function snapshotToArray(childSnapshot) {
                console.log(childSnapshot);
                let returnArr = [];
            
                childSnapshot.forEach(function(childSnapshot) {
                    var displayItem = childSnapshot.val();
                    displayItem.key = childSnapshot.key;
            
                    returnArr.push(displayItem);

                });
                console.log(returnArr);
                return returnArr;

            });


    });

})

<<<<<<< HEAD
                    //for (var i = 0; i < 10; i++) {

                        //$("#search-results").append("<ul><li>" + returnArr[i].name + "</li><li>" + returnArr[i].startDateAndTime + "</li><li>" + returnArr[i].venueName +  "</li><li>" + returnArr[i].venueAddress + "</li></ol>");
                    //};
=======
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

