$(function(){
  function buildHTML(message){
    if (message.text && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="message__upper-message">` +
        `<div class="message__upper-message__user-name">` +
          message.user_name+
        `</div>` +
        `<div class="message__upper-message__date">` +
          message.date +
        `</div>` +
      `</div>` +
      `<div class="mesasge__lower-message">` +
        `<p class="message__lower-message__content">` +
          message.text +
        `</p>` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
    `</div>`
    }
    else if (message.text) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="message__upper-message">` +
        `<div class="message__upper-message__user-name">` +
          message.user_name+
        `</div>` +
        `<div class="message__upper-message__date">` +
          message.date +
        `</div>` +
      `</div>` +
      `<div class="mesasge__lower-message">` +
        `<p class="message__lower-message__content">` +
          message.text +
        `</p>` +
      `</div>` +
    `</div>`
    };
    return html;
  };
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    var jqxhr;
    jqxhr = $.ajax({
      url:url,
      type:'POST',
      data:formData,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(data){

      if(Object.keys(data).length == 0){
        alert("メッセージが空です")
        $('.send-btn').prop('disabled', false);
      }else{
      var html = buildHTML(data);
      $('.main-chat__main-content__message-space').append(html);
      $('.main-chat__main-content__message-space').animate({ scrollTop: $('.main-chat__main-content__message-space')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.send-btn').prop('disabled', false);
      }

    })
    .fail(function(){
      alert('メッセージを入力してください！');
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__main-content__message-space').append(insertHTML);
        $('.main-chat__main-content__message-space').animate({ scrollTop: $('.main-chat__main-content__message-space')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);}
})

