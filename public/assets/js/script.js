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

    $('.collapsible').collapsible({
        constrain_width: false
    });

});


$('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    constrainWidth: false, //changed width of dropdown due to content size 
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  });