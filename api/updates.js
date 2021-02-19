const { getGeoArea } = require('../services/geo')
const { getAircraftsInABox } = require('../services/opensky')
const { sendMessage } = require('../services/telegram')

module.exports = async (req, res) => {
  const msg = req.body
  console.log(msg.message)

  if (msg.message.location) {
    const boundBox = getGeoArea(msg.message.location)
    const planes = await getAircraftsInABox(boundBox)

    planes.forEach(plane => {
      sendMessage(msg.message.chat.id, `${plane.aircraft.manufacturer} ${plane.aircraft.model}
      Operated by: ${plane.aircraft.operator} (${plane.aircraft.country})
      Route: ${plane.route.join(' -> ')}`)
    })
  } else {
    // we received a message, but we don't support this type yet, so let's reply politely
    sendMessage(msg.message.chat.id, 'Hi there! I only understand location messages so far. Please send me a location and I will tell you if there are planes flighing in that area.')
  }

  res.send(true)
}
