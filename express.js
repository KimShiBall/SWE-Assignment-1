var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { runInNewContext } = require('vm');


//global variable for tweet data
var tweetinfo = []
var seachHistory = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //use JSON.Parse to update tweetinfo with proper format for JSON
    tweetinfo = JSON.parse(data);
  }
});
 

//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //send tweetinfo 
  res.send(tweetinfo)
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //send tweetinfo 
  res.send(tweetinfo)
}); 

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //response with search history
      res.send(seachHistory);
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  // create a tweet.
  //add tweet to array
  tweetinfo.push(req.body)
  //send the update array back
  res.send(tweetinfo)
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  tweetinfo.forEach(info => {
    //parse input into integer for compare method
    var id = parseInt(info.id_str)
    if (id == req.body.text){
      //response with the tweet found
      res.send(info);
      //add to history
      seachHistory.push(info);
    }
  });
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //update new Screen name
  tweetinfo.forEach(info => {
    //check for req value and compare
    if (info.user.name===req.body.name){
      //change name
      info.user.screen_name = req.body.newName
    }    
  });
  res.send(tweetinfo)
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //delete a tweet
  var count=0
  tweetinfo.forEach(info => {
    //parse input into integer for compare method 
    if (info.id_str===req.body.id){
      //using splice method to delete element
      tweetinfo.splice(count,1)
    }
    count++    
  });
  res.send(tweetinfo)
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});