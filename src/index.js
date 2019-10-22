import $ from 'jquery'

$(document).ready(() => {
  getWord();

  $('.break').on('click', function() {
    var times = 20;
    for(var i=0; i < times; i++){
      hedgies();
    }
    getWord();
  })
})

var hedgies = function() {
  let text = $.trim($("textarea").val())
  let postBody = { word: { value: text} }
  fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postBody)
  })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error))
}

var getWord = function() {
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word', {
    method: 'get',
    headers: { "Content-Type": "application/json" }
  })
  .then(response => response.json())
  .then(response => {
    $('.word').empty().append(`Word: ${Object.keys(response.word)[0]}`)
    $('.count').empty().append(`Count: ${Object.values(response.word)[0]}`)
  })
  .catch(error => console.log(error))
}
