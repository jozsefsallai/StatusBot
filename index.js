const winston = require('winston')
const Discord = require('discord.js')
const getStatus = require('./getStatus')
const config = require('./config')

const client = new Discord.Client()

client.on('ready', () => {
  winston.log('info', 'Ready to serve, Captain!')
  if (config.app.activity) {
    client.user.setActivity(config.app.activity)
  }

  setInterval(() => {
    const role = client.guilds.get(config.app.guild).roles.find('name', config.app.roleToMention)
    getStatus(role)
      .then((status) => {
        if (status) {
          client.guilds.get(config.app.guild).channels.get(config.app.channel).send(status)
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }, 60 * 60 * 1000 * config.app.refreshInterval)
})

client.on('message', async (message) => {
  if (message.isMentioned(client.user) && message.channel.id === config.app.channel) {
    const role = client.guilds.get(config.app.guild).roles.find('name', config.app.roleToMention)
    getStatus(role)
      .then((status) => {
        if (status) {
          message.channel.send(status)
        } else {
          message.channel.send(':tada: Woohoo! At the moment, all your websites are completely functional.')
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
})

client.login(config.app.token)
