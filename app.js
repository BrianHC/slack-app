require('dotenv').config()
var http = require('http');

const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');

async function  main() {
  const app = new App({
    token: process.env.BOT_TOKEN,
    socketMode: true,
    appToken: process.env.APP_TOKEN
    //token: process.env.BOT_TOKEN //disable this if enabling OAuth in socketModeReceiver
  });



  app.event('app_home_opened', async ({context, payload, event, client}) => {

    try {
      // Call views.publish with the built-in client

      // client.chat.postMessage({
      //     channel: 'C01J1QWV8J3',
      //     text: "dont worry about it, you see nothing"
      // })
      const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Welcome home, <@" + event.user + "> :house:*"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "sup dipshit!"
              }
            }
          ]
        }
      });

      console.log(result);
    }
    catch (error) {
      console.error(error);
    }

  });

  app.command('/clap', async ({body, command, ack, client, context}) => {
    await ack();

    console.log(body)
    let text = command.text;
    let text_2 = text.split(" ");
    let output = ""
    text_2.forEach(word => {
      output += word + ":clap:";
    })

    console.log(context)

    let userInfo  = await client.users.info({
      token: context.botToken,
      user: command.user_id
    })

    console.log(userInfo)
    let displayName = userInfo.user.profile.display_name || userInfo.user.profile.real_name
    //console.log(displayName)

    // console.log('userinfo')
    // console.log(userInfo)

    await client.chat.postMessage({
      token: context.botToken,
      channel: command.channel_id,
      text: output,
      username: displayName
    })

  });

  (async () => {
    await app.start(process.env.PORT || '3000');
    console.log('⚡️ Bolt app started');

  })();
}


main();