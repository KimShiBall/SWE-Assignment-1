
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function(response) {
            var tbod = $("#namebody");
            tbod.html('');
            //add to table when received response
            response.forEach(info => {
                tbod.append('\
                  <tr>\
                      <td id="id">' + info.user.id_str + '</td>\
                      <td id="sName">'+ info.user.screen_name + '</td>\
                      <td id="name">'+ info.user.name + '</td>\
                  </tr>\
                ');
            });
          }
        });
    });

    //Get tweets
    $('#get-tweets-button').on('click', function(){
        $.ajax({
          url: '/tweetinfo',
          method: 'GET',
          success: function(response) {
            // console.log(response[0].user.name);
            var tbod = $("#tweetbody");
            tbod.html('');
            //add to table when received response
            response.forEach(info => {
                tbod.append('\
                  <tr>\
                      <td id="id">' + info.id_str + '</td>\
                      <td id="text">'+ info.text + '</td>\
                      <td id="createAt">'+ info.created_at + '</td>\
                  </tr>\
                ');
            });
          }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
      $.ajax({
        url: '/searchinfo',
        method: 'GET',
        success: function(response) {
          var tbod = $("#searchtweetbody");
          tbod.html('');
          //add to table when received response
          response.forEach(info => {
            tbod.append('\
              <tr>\
                  <td id="id">' + info.id_str + '</td>\
                  <td id="text">'+ info.text + '</td>\
                  <td id="createAt">'+ info.created_at + '</td>\
              </tr>\
            ');
          });
        }
      });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        var inputString = createInput.val();
        const parsedStrings = inputString.split(';');

        var id = parsedStrings[0];
        var text = parsedStrings[1];
        //get date and time
        var date = new Date().toString();
        console.log(date)
        //create a tweet
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          data: JSON.stringify({id_str:id,text:text,created_at:date}),
          method: 'POST',
          success: function(response) {
            var tbod = $("#tweetbody");
            tbod.html('');
            //add to table when received response
            response.forEach(info => {
              tbod.append('\
                <tr>\
                    <td id="id">' + info.id_str + '</td>\
                    <td id="text">'+ info.text + '</td>\
                    <td id="createAt">'+ info.created_at + '</td>\
                </tr>\
              ');
            });
          }
        });

  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID =  $('#search-input');
    // search a tweet and display it.
    $.ajax({
      url: '/searchinfo',
      contentType: 'application/json',
      data: JSON.stringify({id_str:userID.val()}),
      method: 'POST',
      success: function(response) {
        //console.log(response.text);
        var tbod = $("#searchtweetbody");
        tbod.html('');
          //add to table when received response
          tbod.append('\
            <tr>\
                <td id="id">' + response.id_str + '</td>\
                <td id="text">'+ response.text + '</td>\
                <td id="createAt">'+ response.created_at + '</td>\
            </tr>\
          ');
      }
    });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    // update user
    $.ajax({
      url: '/tweets/:nm',
      contentType: 'application/json',
      data: JSON.stringify({name:name,newName:newName}),
      method: 'PUT',
      success: function(response) {
        var tbod = $("#namebody");
        tbod.html('');
        response.forEach(info => {
          //add to table when received response
          tbod.append('\
            <tr>\
            <td id="id">' + info.user.id_str + '</td>\
            <td id="sName">'+ info.user.screen_name + '</td>\
            <td id="name">'+ info.user.name + '</td>\
            </tr>\
          ');
        });
      }
    });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //delete a tweet

    $.ajax({
      url: '/tweetinfo/:tweetid',
      contentType: 'application/json',
      data: JSON.stringify({id:id.val()}),
      method: 'DELETE',
      success: function(response) {
        var tbod = $("#tweetbody");
        tbod.html('');
        //add to table when received response
        response.forEach(info => {
          tbod.append('\
            <tr>\
            <td id="id">' + info.id_str + '</td>\
            <td id="text">'+ info.text + '</td>\
            <td id="createAt">'+ info.created_at + '</td>\
            </tr>\
          ');
        });
      }
    });


  });


});

function test_print(){

  console.log('test code')

};


                    
   