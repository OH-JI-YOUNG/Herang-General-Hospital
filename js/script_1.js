window.addEventListener('scroll', function() {
  var menu = document.getElementById('menu');
  var scrollPosition = window.scrollY;

  
  var colorChangePosition = 4500;

  if (scrollPosition >= colorChangePosition) {
    menu.classList.add('colorChanged'); 
  } else {
    menu.classList.remove('colorChanged'); 
  }
});
window.addEventListener('scroll', function() {
  var menu = document.getElementById('menu');
  var scrollPosition = window.scrollY;

  // Adjust these values according to your needs
  var hidePosition = 5030;
  var showPosition = 6100;

  if (scrollPosition >= hidePosition && scrollPosition < showPosition) {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
});

$(function(){
  /*.gnb>li에 마우스를 올리면 내가 마우스를 올린 li 안에 있는 .sub가 슬라이드되어 내려온다.
  .gnb>li에서 마우스가 나가면 내가 마우스를 내린 li 안에 있는 .sub가 슬라이드되어 올라간다.
  */
 $(".gnb>li").mouseenter(function(){
  $(this).children(".sub").stop().slideDown();
 });
 $(".gnb>li").mouseleave(function(){
  $(this).children(".sub").stop().slideUp();
 });
});

$( document ).ready(function() {
  $('.trigger').on('click', function() {
     $('.modal-wrapper').toggleClass('open');
    $('.page3_btn').toggleClass('blur-it');
     return false;
  });
});

/*햄부기*/
$(function () {
  $("#slide-open").click(function () {
    if ($("#burgur").hasClass("on")) {
      $("#burgur").removeClass("on");
      $("#slide").removeClass("on");
    } else {
      $("#burgur").addClass("on");
      $("#slide").addClass("on");
    }
  });
  $("#slide ul li a").click(function () {
    if ($("#burgur").hasClass("on")) {
      $("#burgur").removeClass("on");
      $("#slide").removeClass("on");
    } else {
      $("#burgur").addClass("on");
      $("#slide").addClass("on");
    }
  });

  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          500
        ); //움직이는 시간 조정
        return false;
      }
    }
  });
});
