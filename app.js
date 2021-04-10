require('dotenv').config()
const express = require('express')
var events = require('./src/events');
var commands = require('./src/commands');
var database = require('./src/database');
var email = require('./src/email');
const cache = require('./src/cache');
const { App, LogLevel } = require('@slack/bolt');


async function  main() {

  database.init({
    endpoint: process.env.DB_URI, 
    key:  process.env.DB_PRIMARY_KEY,
    databaseId: process.env.DATABASEID,
    containerId: process.env.CONTAINERID
  })

  email.setApiKey(process.env.SENDGRID_API_KEY)

  // let msg = {
  //   to: 'brian.c3po@gmail.com', // Change to your recipient
  //   from: 'brian.c3po@gmail.com', // Change to your verified sender
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // let text = "hello world \n testing multiline \n is this working"
  // msg.subject = `archive of testing`
  // msg.text = text;
  // msg.html = `<div>text </div> <div> text 2 </div>`;

  // console.log(msg)
  // email
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  const app = new App({
    token: process.env.BOT_TOKEN,
    socketMode: true,
    appToken: process.env.APP_TOKEN
  });

  cache.user.init({
    client: app.client,
    botToken: process.env.BOT_TOKEN
  })
  // console.log('client')
  // console.log(app.client.users)

  app.event('app_home_opened', events.app_home_opened);

  app.command('/clap', commands.clap);

  app.command('/save', commands.save);

  (async () => {
    await app.start(process.env.PORT || '3000');
    console.log('⚡️ Bolt app started');
  })();

  azureHealthCheck();
}

function azureHealthCheck() {
  const app = express()
  const port = process.env.PORT || 8080

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main();