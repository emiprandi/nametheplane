const got = require('got')

module.exports = async (req, res) => {
  const msg = req.body
  console.log(msg.message)

  await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    retry: 0,
    json: {
      chat_id: msg.message.chat.id,
      text: 'Hi!',
    },
  });

  res.send('ok')
}
