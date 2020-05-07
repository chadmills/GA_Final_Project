

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

  // clear the user's comment from the input (for UX purposes)
  //$('#comment').val('')

  // create a section for comments data in your db
  var reservationReference = database.ref('reservations');
  // use the set method to save data to the comments
  reservationReference.push({
    customerName: userName,
    reservationDay: userDay 
  });
});












      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.8054491, lng: -73.9654415},
          zoom: 8
        });
      }

