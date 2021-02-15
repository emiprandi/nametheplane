const got = require('got')

got(`https://opensky-network.org/api/states/all?lamin=48.01833&lomin=10.527735999999999&lamax=48.818329999999996&lomax=11.327736`, {
  responseType: 'json'
})
.then(r => {
  //console.log(r.body.states)

  r.body.states.forEach(plane => {
    console.log(plane[0], plane[1], plane[2])
  })
})
