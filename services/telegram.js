const got = require('got');

const sendMessage = async (chat, message) => {
  try {
    const response = await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: chat,
        parse_mode: 'HTML',
        text: message,
      },
    })
    console.log(response.body)
  } catch (err) {
  }
}

module.exports = {
  sendMessage
}
