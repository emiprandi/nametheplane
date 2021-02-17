const got = require('got')

module.exports = async (req, res) => {
  const msg = req.body
  console.log(msg.message)

  if (msg.message.location) {
    // aprox 50km
    const radiusInDregrees = 0.4

    const location = msg.message.location
    const boundBox = {
      lamin: location.latitude - radiusInDregrees,
      lomin: location.longitude - radiusInDregrees,
      lamax: location.latitude + radiusInDregrees,
      lomax: location.longitude + radiusInDregrees,
    }

    const planesRaw = await got(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`, {
      retry: 0,
      responseType: 'json'
    })

    const planes = []
    planesRaw.body.states.forEach((plane, index) => {
      planes[index] = []
      planes[index].push(
        got(`https://opensky-network.org/api/metadata/aircraft/icao/${plane[0]}`),
        got(`https://opensky-network.org/api/routes?callsign=${plane[1].trim()}`),
      )
    })

    const planesFinal = planes.map(async plane => {
      const result = await Promise.all(plane)
      return {
        callsign: result[1].callsign,
        flightNumber: result[1].flightNumber,
        manufacturer: result[0].manufacturerName,
        model: result[0].model,
        operator: result[0].operatorCallsign,
        country: result[0].country,
        route: result[1].route
      }
    })

    console.log(planesFinal)

    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: msg.message.chat.id,
        parse_mode: 'HTML',
        text: 'TBD',
      },
    })
  } else {
    // we received a message, but we don't do anything with messages yet, so let's reply politely
    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: msg.message.chat.id,
        text: `Hi there! I only understand location messages so far. Please send me a location and I will tell you if there are planes flighing in that area.`,
      },
    })
  }

  res.send(true)
}
