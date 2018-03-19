////////PAGE Slide Function////////
$(document).ready(function(){
    $("a").on('click', function(event) {

      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({

          scrollTop: $(hash).offset().top
        }, 800, function(){
    
          window.location.hash = hash;
        });
      } 
    });
});

//////Mobile Nav//////////////

$(document).ready(function(){
  nav = $(".toggle");
  menuList = $(".nav");
  listItem = $("li");

  nav.click(function(){
    menuList.toggleClass("active");
  
    

  })
})


