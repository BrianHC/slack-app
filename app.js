require('dotenv').config()
var http = require('http');
var events = require('./src/events');
var commands = require('./src/commands');
var database = require('./src/database');
const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');


async function  main() {

  //console.log(database.getClient());
  database.init({
    endpoint: process.env.DB_URI, 
    key:  process.env.DB_PRIMARY_KEY,
    databaseId: process.env.DATABASEID,
    containerId: process.env.CONTAINERID
  })

  // database.testFetchAll();

  // console.log(database.getClient());

  const app = new App({
    token: process.env.BOT_TOKEN,
    socketMode: true,
    appToken: process.env.APP_TOKEN
  });

  app.event('app_home_opened', events.app_home_opened);

  app.command('/clap', commands.clap);

  (async () => {
    await app.start(process.env.PORT || '3000');
    console.log('⚡️ Bolt app started');
  })();
}


main();