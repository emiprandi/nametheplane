const got = require('got');

module.exports = (req, res) => {
  console.log({
    body: req.body,
  })

  const msg = req.body

  console.log({
    from: msg.message.from,
    chat: msg.message.chat,
    full: msg.message,
  })

  // (async () => {
  //   try {
  //     const {body} = await got.post('https://webhook.site/9e6e3d2f-3614-4ba0-90e2-1f320192f561', {
  //       json: {
  //         body: req.body,
  //         query: req.query,
  //         cookies: req.cookies,
  //       },
  //       responseType: 'json'
  //     });

  //     result = body
  //   } catch (err) {
  //     result = 'Somthing went really bad :' + err
  //   }
  // })();

  res.send('ok')
}
