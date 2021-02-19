const got = require('got');
const { getGeoAreaFromLocation } = require('./geo')

const getAircraftInfo = async (icao) => {
  let aircraft;
  try {
    response = await got(`https://opensky-network.org/api/metadata/aircraft/icao/${icao}`, {
      retry: 0,
      responseType: 'json'
    })

    aircraft = {
      manufacturer: response.body.manufacturerName,
      model: response.body.model,
      operator: response.body.operatorCallsign,
      country: response.body.country,
    }
  } catch (err) {
    aircraft = {
      manufacturer: '',
      model: 'Not available',
      operator: 'Not available',
      country: 'Not available',
    }
  }
  return aircraft
}

const getFlightRoute = async (callsign) => {
  let route;
  try {
    response = await got(`https://opensky-network.org/api/routes?callsign=${callsign}`, {
      retry: 0,
      responseType: 'json'
    })
    route = response.body
  } catch (err) {
    route = ['Not available']
  }
  return route
}

const getAircraftsByLocation = async (location) => {
  let aircrafts = []

  try {
    const boundBox = getGeoAreaFromLocation(location)
    console.log(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`)
    const aircraftsInArea = await got(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`, {
      retry: 0,
      responseType: 'json'
    })

    if (aircraftsInArea.body.states) {
      aircrafts = aircraftsInArea.body.states.map(async plane => {
        const icao = plane[0]
        const callsign = plane[1].trim()
        return {
          icao: icao,
          callsign: callsign,
          aircraft: await getAircraftInfo(icao),
          route: await getFlightRoute(callsign),
        }
      })
    }
  } catch (err) {
  }

  return Promise.all(aircrafts)
}

module.exports = {
  getAircraftsByLocation
}
