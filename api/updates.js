const got = require('got')

module.exports = async (req, res) => {
  const msg = req.body
  console.log(msg.message)

  if (msg.message.text) {
    // we received a message, but we don't do anything with messages yet, so let's reply politely
    await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      retry: 0,
      json: {
        chat_id: msg.message.chat.id,
        text: `Hi there! I only understand location messages so far. Please send me any
          location and I will tell you if there are planes flighing in that area.`,
      },
    });
  } else if (msg.message.location) {
    // aprox 50km
    const radiusInDregrees = 0.4

    const location = msg.message.location;
    const boundBox = {
      lamin: location.latitude - radiusInDregrees,
      lomin: location.longitude - radiusInDregrees,
      lamax: location.latitude + radiusInDregrees,
      lomax: location.longitude + radiusInDregrees,
    }
    console.log(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`)

    // const planes = await got(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`, {
    //   retry: 0,
    // });

    // await got.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    //   retry: 0,
    //   json: {
    //     chat_id: msg.message.chat.id,
    //     text: `Hi there! I only understand location messages so far. Please send me any
    //       location and I will tell you if there are planes flighing in that area.`,
    //   },
    // });
  }

  res.send(true)
}
