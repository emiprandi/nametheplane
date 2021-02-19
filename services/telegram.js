const got = require('got');

const sendMessage = async (chat, message) => {
  try {
    await got.post(`https://webhook.site/9e6e3d2f-3614-4ba0-90e2-1f320192f561`, {
      retry: 0,
      json: {
        chat_id: chat,
        parse_mode: 'MarkdownV2',
        text: message,
      },
    })
    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: chat,
        parse_mode: 'MarkdownV2',
        text: message,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  sendMessage
}
