

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
 console.log('submitting form');
  e.preventDefault();

  // grab user's comment from input field
  var userName = $('#frmUserName').val();
  var userDay = $('#frmUserDay').val();


    // clear the user's name from the input field (for UX purposes)
  $('#frmUserName').val('');


  // create a section for reservation data in  db
  var reservationReference = database.ref('reservations');

  // use the set method to save data to the comments
  reservationReference.push({
    customerName: userName,
    reservationDay: userDay 
  });


// a) Hide the form. show hidden reslts panel to user

  $('#frmPanel').hide();
  $('#resultPanel').show();
});

//  When "Add.."  link is clicked display form again to user

$('#addNew').on('click', function (e){

  e.preventDefault();

 $('#resultPanel').hide();
  $('#frmPanel').show();
  console.log('user clicked Add.. link to create a new reservation');

});



function getReservations() {

alert('loading reservations...');

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
      // Pass the data for this comment (context) into the template
      var rsvpListElement = template(context);
      // push newly created element to array of comments
     rsvps.push(rsvpListElement)
    }
    alert(rsvpListElement);
    // Update the DOM
    // remove all list items from DOM before appending list items
    $('.customerRSVPs').empty()
    // append each comment to the list of comments in the DOM
    for (var i in rsvps) {
      $('.customerRSVPs').append(rsvps[i])
    }
  });

}




getReservations();


      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.8054491, lng: -73.9654415},
          zoom: 8
        });
      }

