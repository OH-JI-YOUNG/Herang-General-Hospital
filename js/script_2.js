
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