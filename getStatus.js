const config = require('./config')
const axios = require('axios')

const checkUrl = (url) => {
  return new Promise((resolve) => {
    axios.get(url, { 'timeout': config.app.timeout * 1000 })
      .then(() => {
        return resolve('OK')
      })
      .catch((err) => {
        if (err.response) {
          return resolve('BAD_STATUS')
        } else {
          return resolve('UNREACHABLE')
        }
      })
  })
}

const asyncLoop = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}

module.exports = async (role) => {
  const domains = config.domains
  let down = []
  let badStatus = []

  await asyncLoop(domains, async (domain) => {
    return checkUrl(domain)
      .then((status) => {
        switch (status) {
          case 'BAD_STATUS':
            return badStatus.push(domain)
          case 'UNREACHABLE':
            return down.push(domain)
        }
      })
  })

  if (!down.length && !badStatus.length) {
    return config.app.quiet ? null : ':tada: Woohoo! At the moment, all your websites are completely functional.'
  } else {
    let message = `:warning: **${role}, some of your websites are not functional!**\n`

    if (down.length) {
      message += '\nThe following websites are inaccessible:\n'
      down.forEach((domain) => {
        message += ` - ${domain}\n`
      })
    }

    if (badStatus.length) {
      message += '\nThe following websites return a bad status code (>= 400):\n'
      badStatus.forEach((domain) => {
        message += ` - ${domain}\n`
      })
    }

    return message
  }
}
