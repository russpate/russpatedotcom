
var path  = require('path');
var views = (new require('..')).views(path.join(__dirname, 'views'));

require('http').createServer((req, res) => {
  res.render = views.render.bind(views, req, res, next);
  res.render('index');
}).listen(3000);
