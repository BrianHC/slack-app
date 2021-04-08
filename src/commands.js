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

module.exports = {
    clap
}