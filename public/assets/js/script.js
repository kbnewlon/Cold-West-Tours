// On page load
$(document).ready(function () {
    // Get sidenav element with class sidenav
    var elem = document.querySelector(".sidenav");

    // Create new sidenav instance 
    var instance = new M.Sidenav(elem); 

    // Initiate sidenav
    $(".sidenav").sidenav();

    // If clicked on hamburger icon, open sidenav
    $("#menu-icon").on("click", function () {
        instance.open();
    });
    
    // If clicked on places other than sidenav, close sidenav
    $(".container").on("click", function () {
        instance.close();
    });

});

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, {});
//   });

// Dropdown menu addEventListener with jquery
//   $('.dropdown-trigger').dropdown();

$('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  });