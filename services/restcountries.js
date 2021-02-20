const got = require('got');

const getCountryByCode = async (countryCode) => {
  let country
  try {
    const response = await got(`https://restcountries.eu/rest/v2/alpha/${countryCode.toLowerCase()}?fields=name`, {
      retry: 0,
      responseType: 'json'
    })

    console.log('country', countryCode, response.body)

    if (response.body.name) {
      country = country.body.name
    }
  } catch (err) {
    country = null
  }

  return country
}

module.exports = {
  getCountryByCode
}
