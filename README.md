**DEPRECATED. Please check [this](https://github.com/jozsefsallai/thimble-bot-custom-directives/blob/master/lib/StatusTracker.js) and the command/worker associated to it.**

---

# StatusBot

[![Build Status](https://travis-ci.org/jozsefsallai/StatusBot.svg?branch=master)](https://travis-ci.org/jozsefsallai/StatusBot)

A Discord bot that tells you if there's any problems with your websites. The app will send a new message to a specific channel from a specific Discord server at a given refresh interval.

## How It Works

The bot will automatically fetch all the websites you've provided to it and see if they are accessible. Then it will send a message to the channel you've specified, at a given refresh interval. The bot will separate the sites that are unavailable and the ones that throw an HTTP status code that is greater than or equal to 400, and will show them separately in the Discord message. Unless quiet mode is enabled, the bot will send a message even if all your websites are functional.

---

## Prerequisites
 * Node v8+
 * A Discord server with a channel dedicated to the bot
 * A registered Discord application

## Getting Started

1. Clone this repository:
```
git clone git@github.com:jozsefsallai/StatusBot
cd StatusBot
```

2. Install the dependencies:
```
npm i -g yarn
yarn
```

3. Create the config file:
```
cp config.example.json config.json
```

## Configuration

All the configuration is done in the `config.json` file. To get the guild and channel IDs, make sure to enable **Developer Mode** in your Discord settings. 

You need to enter each domain you want to check into the `domains` array (separated by comma). The domains **must** include the protocol (http or https). If the protocol is missing or is not http or https, the bot will mark it as unreachable.

The `app.refreshInterval` setting (hours) tells the bot how often it should check the websites. The default value is 1 hour.

The `app.roleToMention` setting is the name of the role that will get mentioned whenever something is wrong. Make sure to enable the "Allow anyone to @mention this role" option in the role's settings.

The `app.timeout` setting (seconds) is the check timeout for a single website. The default value is 5 seconds, so if a website doesn't load in 5 seconds, the bot will mark it as unreachable. Please note that the more websites you have, the longer it will take for the bot to check them all.

The `app.quiet` setting (boolean) will tell the bot whether it should only send a message to the channel if there is something wrong with at least one of the websites (`true`) or at every check, even if everything's okay (`false`).

## Starting

After you've edited your configfile, all you have to do is run the application! I recommend using tools like `pm2` or `forever`. I have included a configuration file for `pm2`.

```
npm i -g pm2
pm2 start run.json
```

## Contribution

Contribution is most welcome! Before submitting any changes, make sure that your modifications pass linting:

```
yarn lint
```

## License

All rights reserved.
