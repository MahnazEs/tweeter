/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {

  $("#error-message-empty").hide();
  $("#error-message-tooLong").hide();


  const data = [];
  /*  {
     "user": {
       "name": "Newton",
       "avatars": "https://i.imgur.com/73hZDYK.png"
       ,
       "handle": "@SirIsaac"
     },
     "content": {
       "text": "If I have seen further it is by standing on the shoulders of giants"
     },
     "created_at": 1461116232227
   },
   {
     "user": {
       "name": "Descartes",
       "avatars": "https://i.imgur.com/nlhLi3I.png",
       "handle": "@rd" },
     "content": {
       "text": "Je pense , donc je suis"
     },
     "created_at": 1461113959088
   }
 ]; */

  /* $("#new-tweet-form").submit(function(event){
    event.preventDefault();
    const maxChar=140;
    const inputLength = $(this).find("#tweet-text").val().length;
    if(!inputLength){
      return alert("Please enter a tweet!!!");
    }
    if(inputLength-maxChar>0){
      return alert("Yourtweet is longer than 140 letters. Please fix it!!!");
    }
    const newTweet = $(this).serialize();
    $.post("/tweets/",newTweet,()=>{
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val(maxChar);
      loadTweets();
    });
  }); */

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //post
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      //console.log($tweet);
      $("#tweets-container").append($tweet);
    }
  };


  const createTweetElement = function (tweetData) {
    let $tweet = $(`
<article class="tweet">
      <header class="tweet-header">
        <div class="user-profile">
          <img class="user-icon" src="${tweetData.user.avatars}"></img> 
          <h4 class="user-name">${tweetData.user.name}</h4>
        </div>
        <div>
          <h4 class="user-handle">${tweetData.user.handle}</h4>
        </div>
      </header>
      <div class="tweet-text">
        ${escape(tweetData.content.text)};
      </div>
      <footer class="tweet-footer">
        <span class="tweet-date">${timeago.format(tweetData.created_at)}</span>
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  };


  //renderTweets(data);

  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET", dataType: "json", })
      .then((newTweet) => {
        renderTweets(newTweet.reverse());
      });
  };
  loadTweets();

  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    const maxChar = 140;
    const inputLength = $(this).find("#tweet-text").val().length;

    $("#error-message-empty").slideUp("slow");
    $("#error-message-tooLong").slideUp("slow");

    if (!inputLength) {
      //return alert("Please enter a tweet!!!");
      $("#error-message-empty").slideDown("slow");
      $("#error-message-tooLong").hide();
    } else if (inputLength - maxChar > 0) {
      //return alert("Yourtweet is longer than 140 letters. Please fix it!!!");
      $("#error-message-tooLong").slideDown("slow");
      $("#error-message-empty").hide();
    } else {
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet, () => {
        $(this).find("#tweet-text").val("");
        $(this).find(".counter").val(maxChar);
        loadTweets();
      });
    };

  });

});






