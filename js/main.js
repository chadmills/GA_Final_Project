

// 1. Initialize Firebase



    var firebaseConfig = {
    apiKey: "AIzaSyAlqwNfyKXesEUIt_kTPKD1PVMVDUQsQxk",
    authDomain: "ga-final-project-1c2f2.firebaseapp.com",
    databaseURL: "https://ga-final-project-1c2f2.firebaseio.com",
    projectId: "ga-final-project-1c2f2",
    storageBucket: "ga-final-project-1c2f2.appspot.com",
    messagingSenderId: "895039847864",
    appId: "1:895039847864:web:df9eaa4fb54dd2c5e4e34d"
  };

  firebase.initializeApp(firebaseConfig);
  

// 2. Connect to your Firebase application using your reference URL

var database = firebase.database();


  // After we have initialized Firebase and created a reference to our database…
// When the comment form is submitted (the user hits enter)

$('#frmReserve').on('submit', function (e) {
  // prevent the page from reloading

 console.log('submitting form to remote Firebase Database');

  e.preventDefault();

  // grab user's reservation data from input field

  var userName = $('#frmUserName').val();
  var userDay = $('#frmUserDay').val();


    // clear the user's name from the input field (for UX purposes)

  $('#frmUserName').val('');


  // create a section for reservation data in  db
  var reservationReference = database.ref('reservations');

  // use the set method to save data 

  reservationReference.push({
    customerName: userName,
    reservationDay: userDay 
  });


// a) Hide the form. show hidden & display results panel to user

  $('#frmPanel').hide();
  $('#resultPanel').show();
});

//  When "Add.."  link is clicked display form again to user

$('#addNew').on('click', function (e){

//Prevent from Default Behavior

  e.preventDefault();

// a) Hide results panel. Show Form to enter in additional reservation

 $('#resultPanel').hide();
  $('#frmPanel').show();
  console.log('user clicked Add.. link to create a new reservation');

});



//function: getReservations() Pull previously entered reservations & display them

function getReservations() {

//alert('loading reservations from Firebase DB...');

//$('#reservationPanel').html('Writing reservations');

database.ref('reservations').on('value', function (results) {
    var allRSVPs = results.val();
    var rsvps = [];
    for (var item in allRSVPs) {
      var context = {
        userName: allRSVPs[item].customerName,
        userDay: allRSVPs[item].reservationDay,
        rsvpId: item
      };
      // Get the HTML from our Handlebars comment template
      var source = $("#rsvp-template").html();
      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      // Pass the data for this rsvp (context) into the template
      var rsvpListElement = template(context);
      // push newly created element to array of rsvps

     rsvps.push(rsvpListElement)
    }

    //alert(rsvpListElement);

    // Update the DOM
    // remove all list items from DOM before appending list items

    $('.customerRSVPs').empty()

    // append each reservation to the list of reservations in the DOM
    for (var i in rsvps) {
      $('.customerRSVPs').append(rsvps[i])
    }
  });

}

var today = new Date(),
    open = "<font color='green'>We're open today from 7am - 9pm</font>",
    closed = "<font color='red'>We're closed and will open again tomorrow 7am - 6pm</font>",
    display = document.getElementById('display');

if (today.getHours() >= 7 && today.getHours() < 20) {
    display.innerHTML = open;
} else {
    display.innerHTML = closed;
}



//load previously entered reservations on page load

getReservations();


//Deleting Reservations logic

 $('.customerRSVPs').on('click', '.delete', function (e) {
 // Get the ID for the comment we want to update
  var id = $(e.target).parent().data('id');

 	alert('clicked delete id: ' + id);

 	 // find comment whose objectId is equal to the id we're searching with
  var rsvpReference = database.ref('reservations/' + id)


  // Use remove method to remove the reservation from the database
  rsvpReference.remove()


});


//Function getWeatherInfo(): Pulls Houston Weather data from Open Weather API
var OPEN_WEATHER_MAP_API = "https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=63adcaf64b9cec0202ac5ba456150a9e"

function getWeatherInfo() {

   $.get(OPEN_WEATHER_MAP_API, function(searchResult) {
       
       var stringOutput;
       var celsiusTemp = toCelsius(searchResult.main.temp);
       
            

        stringOutput = "<p>"+ searchResult.name + ", Texas<br>"; //adding result city name
        stringOutput +=  searchResult.main.humidity + "% humidity<br>";
        stringOutput += celsiusTemp + " C" + "<br>"; //adding result temperature
       stringOutput +="</p>";


$('#weatherForecast').html(stringOutput);


       });

}

function toCelsius(kelvinTemp) {
  var temp = Math.round(kelvinTemp - 273.15);
  return temp;
}



//Call getWeatherInfo() function when page loads

getWeatherInfo();