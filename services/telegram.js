const got = require('got');

const sendMessage = async (chat, message) => {
  try {
    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: chat,
        parse_mode: 'MarkdownV2',
        text: message,
      },
    })
  } catch (err) {
  }
}

module.exports = {
  sendMessage
}
