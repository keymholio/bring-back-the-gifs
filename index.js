var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/', function(request, response) {
  var body = '';

  request.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      request.connection.destroy();
  });

  request.on('end', function () {
    var post = JSON.parse(body);
    console.log(post.item.message.message);

    var res = {
      "color": "blue",
      "message": post.item.message.message,
      "notify": true,
      "message_format": "text"
    };
    
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(res, null, 3));
  });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
