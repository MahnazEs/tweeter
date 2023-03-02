
 $(document).ready(function () {
  console.log("page is ready");


  $("#tweet-text").on("keyup", function () {
    const maxChar = 140;
    const inputChar = $("#tweet-text").val().length;
    const charCounter = maxChar - inputChar;
    
    const $counterElement = $(".counter");
    $counterElement.text(charCounter);

    if (charCounter < 0) {
      $counterElement.addClass("invalid");
    } else {
      $counterElement.removeClass("invalid");
    }
  });
}); 




