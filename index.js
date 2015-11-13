var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

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
    var msg = post.item.message.message;
    // regex to match image url
    var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(.gif|.jpg|.png)$/;

    msg = msg.replace('/gif ', '');
    msg = msg.replace('/img ', '');

    // if valid url
    if (msg.match(re)) {
      msg = '<img src="' + msg + '" />';

      var res = {
        "color": "green",
        "message": msg,
        "notify": true,
        "message_format": "html"
      };

      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(res, null, 3));
    } else {
      response.status(500).send('Invalid image url! (Yes, I\'m shouting)');
    }
  });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
