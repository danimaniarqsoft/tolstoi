module.exports = function (webserver, controller) {
  // This create the /site route, where an easy-to-copy embed code is available
  webserver.get('/site', function (req, res) {
    res.render('site', {
      layout: 'layouts/default',
      base_url: req.headers.host
    });

  });

  // This create the /site route, where an easy-to-copy embed code is available
  webserver.get('/test', function (req, res) {
    res.render('test', {
      layout: 'layouts/default',
      base_url: req.headers.host
    });

  });

  // This creates the /embed route, where an easy-to-copy embed code is available
  webserver.get('/embed', function (req, res) {

    res.render('embed', {
      layout: 'layouts/default',
      base_url: req.headers.host
    });

  });

  // This creates the /embed route, where an easy-to-copy embed code is available
  webserver.get('/', function (req, res) {

    res.render('index', {
      layout: 'layouts/default',
      base_url: req.headers.host,
    });

  });

}