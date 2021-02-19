const got = require('got');

const sendMessage = async (chat, message) => {
  try {
    console.log('sending msg to:', chat, process.env.BOT_TOKEN)
    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: chat,
        parse_mode: 'HTML',
        text: message,
      },
    })
  } catch (err) {
  }
}

module.exports = {
  sendMessage
}
