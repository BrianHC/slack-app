let sendGrid = require('./email');

let clap = async ({body, command, ack, client, context}) => {
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

}

let save = async ({body, command, ack, client, context}) => {

    await ack();
  let msg = {
    to: 'brian.c3po@gmail.com', // Change to your recipient
    from: 'brian.c3po@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

 // console.log(body)

  let userInfo  = await client.users.info({
    token: context.botToken,
    user: command.user_id
  })

  let email = userInfo.user.profile.email;

  let channelId = command.channel_id;

  let channelHistory = await client.conversations.history({
      token: context.botToken,
      channel: channelId
  })

  let text = "";
  if(channelHistory.ok){
      let messages = channelHistory.messages;
    messages.forEach(message => {
        //console.log(message)
        if(message.user){
            text += `\n ${message.user} -  ${message.text}`
        }
    })
  }


  console.log(text);

  msg.subject = `archive of ${channelId}`
  msg.to = email;
  msg.text = text;
  msg.html = "<div>" + text + "</div>";

  console.log(msg)
  sendGrid
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = {
    clap,
    save
}