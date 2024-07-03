
$(document).ready(function () {
  //탭버튼 동작 소스


  $(".tab_content").hide(); //tab_content 부분을 모두 숨김.
  $("ul.tabs li:first").addClass("active").show(); //첫번째 탭이 active클래스를 붙이고, 보여줌.
  $(".tab_content:first").show();

  //On Click Event
  $("ul.tabs li").click(function () {

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");
    $(".tab_content").hide();

    var activeTab = $(this).find("span").attr("tabs");
    $(activeTab).fadeIn();
    return false;
  });
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