function test(){
  var tabsNewAnim = $('#navbarSupportedContent');
  var activeItemNewAnim = tabsNewAnim.find('li.active');
  if(activeItemNewAnim.length == 0) return;

  var activeHeight = activeItemNewAnim.innerHeight();
  var activeWidth = activeItemNewAnim.innerWidth();
  var itemPos = activeItemNewAnim.position();

  $(".hori-selector").css({
    "top": itemPos.top + "px",
    "left": itemPos.left + "px",
    "height": activeHeight + "px",
    "width": activeWidth + "px"
  });
}

$(document).ready(function(){
  setTimeout(test, 100);

  $("#navbarSupportedContent").on("click", "li", function(){
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    test();
  });
});

$(window).on('resize', function(){
  setTimeout(test, 500);
});

$(".navbar-toggler").click(function(){
  $(".navbar-collapse").slideToggle(300);
  setTimeout(test, 300);
});
