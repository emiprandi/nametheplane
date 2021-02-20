const { getAircraftsByLocation } = require('../services/opensky')
const { sendMessage } = require('../services/telegram')

module.exports = async (req, res) => {
  const msg = req.body
  const chatId = msg.message.chat.id
  console.log(msg.message)

  if (msg.message.location) {
    const aircrafts = await getAircraftsByLocation(msg.message.location)

    if (aircrafts.length > 0) {
      await Promise.all(aircrafts.map(async plane => {
        let message
        message += '*' + plane.callsign + ':*'
        if (plane.aircraft) {
          message += plane.aircraft.model + '\n'
          message += '_' + plane.aircraft.manufacturer + '_\n'
          message += '*Operated by:*' + plane.aircraft.operator + '\n'
        }
        if (plane.route) {
          message += '*Route:*\n'
          plane.route.forEach(airport => {
            message += ' ○ ' + airport.name + '(' + airport.country + ')\n'
          });
        }
        await sendMessage(chatId, message)
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
