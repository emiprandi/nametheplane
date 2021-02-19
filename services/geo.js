const getGeoAreaFromLocation = (location) => {
  // aprox 50km
  const radiusInDregrees = 0.4

  return {
    lamin: location.latitude - radiusInDregrees,
    lomin: location.longitude - radiusInDregrees,
    lamax: location.latitude + radiusInDregrees,
    lomax: location.longitude + radiusInDregrees,
  }
}

module.exports = {
  getGeoAreaFromLocation
}
