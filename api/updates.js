module.exports = (req, res) => {
  const msg = req.body.message
  console.log(msg)

  // await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
  //   retry: 0,
  //   json: {
  //     chat_id: msg.chat.id,
  //     text: 'Si, soy yo!!!',
  //   },
  // });

  res.status(200)
}
