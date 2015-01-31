var querystring = require('querystring');
var https = require('https');

var host = 'android.googleapis.com';
var api_key = 'AIzaSyDPW-nBiDrpDMEdlajq-tLo6EshcSn_INE';

module.exports = {

    sendData: function(endpoint, method, data, success) {
      var dataString = JSON.stringify(data);
      var headers = {};
      
      if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
      }
      else {
        headers = {
          'Content-Type': 'application/json',
          'Authorization' :  'key=' + api_key,
          'Content-Length': dataString.length
        };
      }
      var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers,
      };

      var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
          responseString += data;
        });

        res.on('end', function() {
          console.log(responseString);
          var responseObject = JSON.parse(responseString);
          success(responseObject);
        });
      });

      req.write(dataString);
      req.end();
    },
};