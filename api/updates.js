const { getAircraftsByLocation } = require('../services/opensky')
const { sendMessage } = require('../services/telegram')

module.exports = async (req, res) => {
  const msg = req.body
  console.log(msg.message)

  if (msg.message.location) {
    const chatId = msg.message.chat.id
    const aircrafts = await getAircraftsByLocation(msg.message.location)
    console.log(aircrafts)

    if (aircrafts.length > 0) {
      await Promise.all(aircrafts.map(async plane => {
        await sendMessage(chatId, `*${plane.aircraft.model}:* ${plane.aircraft.model}
_${plane.aircraft.manufacturer}_
*Operated by:* ${plane.aircraft.operator} (${plane.aircraft.country})
*Route:* ${plane.route}`)
      }))
    } else {
      await sendMessage(chatId, 'I didn\'t find any aircrafts in this area')
    }
  } else {
    // we received a message, but we don't support this type yet, so let's reply politely
    await sendMessage(chatId, 'Hi there! I only understand location messages so far. ' +
      'Please send me a location and I will tell you if there are planes flighing in that area.')
  }

  res.send(true)
}
