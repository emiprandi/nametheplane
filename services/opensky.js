const got = require('got');
const { getGeoAreaFromLocation } = require('./geo')
const { getCountryByCode } = require('./restcountries')

const getAircraft = async (icao) => {
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
    aircraft = null
  }
  return aircraft
}

const getAirport = async (icao) => {
  let airport;
  try {
    response = await got(`https://opensky-network.org/api/airports/?icao=${icao}`, {
      retry: 0,
      responseType: 'json'
    })

    airport = {
      name: response.body.name,
      municipality: response.body.municipality,
      country: await getCountryByCode(response.body.country),
    }
  } catch (err) {
    airport = null
  }

  return airport
}

const getFlightRoute = async (callsign) => {
  let route;
  try {
    response = await got(`https://opensky-network.org/api/routes?callsign=${callsign}`, {
      retry: 0,
      responseType: 'json'
    })
    route = Promise.all(response.body.route.map(async airport => await getAirport(airport)))
  } catch (err) {
    route = null
  }
  return route
}

const getAircraftsByLocation = async (location) => {
  let aircrafts = []

  try {
    const boundBox = getGeoAreaFromLocation(location)
    const aircraftsInArea = await got(`https://opensky-network.org/api/states/all?lamin=${boundBox.lamin}&lomin=${boundBox.lomin}&lamax=${boundBox.lamax}&lomax=${boundBox.lomax}`, {
      retry: 0,
      responseType: 'json'
    })

    if (aircraftsInArea.body.states) {
      aircrafts = Promise.all(aircraftsInArea.body.states.map(async plane => {
        const icao = plane[0]
        const callsign = plane[1].trim()
        return {
          icao: icao,
          callsign: callsign,
          aircraft: await getAircraft(icao),
          route: await getFlightRoute(callsign),
        }
      }))
    }
  } catch (err) {
  }

  return aircrafts
}

module.exports = {
  getAircraftsByLocation
}
