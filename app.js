require('dotenv').config()
var http = require('http');
var events = require('./src/events');
var commands = require('./src/commands');

const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');

async function  main() {
  const app = new App({
    token: process.env.BOT_TOKEN,
    socketMode: true,
    appToken: process.env.APP_TOKEN
    //token: process.env.BOT_TOKEN //disable this if enabling OAuth in socketModeReceiver
  });



  app.event('app_home_opened', events.app_home_opened);

  app.command('/clap', commands.clap);

  (async () => {
    await app.start(process.env.PORT || '3000');
    console.log('⚡️ Bolt app started');

  })();
}


main();