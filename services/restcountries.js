const got = require('got');

const getCountryByCode = async (countryCode) => {
  let country
  try {
    const response = await got(`https://restcountries.eu/rest/v2/alpha/${countryCode.toLowerCase()}?fields=name`, {
      retry: 0,
      responseType: 'json'
    })

    if (response.body.name) {
      country = response.body.name
    }
  } catch (err) {
    country = null
  }

  return country
}

module.exports = {
  getCountryByCode
}
