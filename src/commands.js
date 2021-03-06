let sendGrid = require('./email');
let Cache = require('./cache');

let clap = async ({body, command, ack, client, context}) => {
    await ack();
    console.log('command: clapping')
    //console.log(body)
    let text = command.text;
    let text_2 = text.split(" ");
    let output = ""
    text_2.forEach(word => {
      output += word + ":clap:";
    })

    //console.log(context)

    // let userInfo  = await client.users.info({
    //   token: context.botToken,
    //   user: command.user_id
    // })
    let userInfo  = await Cache.user.fetch(command.user_id);
    

    //console.log(userInfo)
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
    console.log('command: save')
    await ack();
    let msg = {
        to: 'brian.c3po@gmail.com', // Change to your recipient
        from: 'brian.c3po@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

 // console.log(body)

//   let userInfo  = await client.users.info({
//     token: context.botToken,
//     user: command.user_id
//   })
  let userInfo  = await Cache.user.fetch(command.user_id);


  let email = userInfo.user.profile.email;

  let channelId = command.channel_id;

  let channelHistory = await client.conversations.history({
      token: context.botToken,
      channel: channelId
  })

  let text = "";
  let html = "";
  
  if(channelHistory.ok){
    let messages = channelHistory.messages;
    await messages.forEach(async message => {
        //console.log(message)
        if(message.user){
            let myUser = await Cache.user.fetch(message.user)
            
            //console.log(myUser)

            text += `\n ${myUser.user.name} -  ${message.text}`
            html += `<div> ${myUser.user.name} -  ${message.text} </div>`
        }
    })
  }


// console.log("html:")
// console.log(html)

  msg.subject = `archive of ${channelId}`
  msg.to = email;
  msg.text = text;
  msg.html = html;

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