const got = require('got');

module.exports = (req, res) => {
  const msg = req.body.message
  console.log(msg)

  got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    json: {
      chat_id: msg.chat.id,
      text: 'Si, soy yo!!!',
    },
  });

  res.status(200)
}
