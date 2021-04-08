let app_home_opened = async ({context, payload, event, client}) => {

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

  }
  
  module.exports = {
      app_home_opened
  }