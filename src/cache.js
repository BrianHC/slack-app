class UserCache {
    temp;

    init({client, botToken}){
        this.temp = {};
        this.client = client;
        this.botToken = botToken;

    }
    async fetch(slackUserId) {

        if(this.temp[slackUserId]) {
            console.log(`user: ${slackUserId} is in cache `)
            return this.temp[slackUserId]
        } else {

            console.log('need to fetch from slack')
            let userInfo  = await this.client.users.info({
                token: this.botToken,
                user: slackUserId
            })
    
            this.temp[slackUserId] = userInfo;
            return userInfo
        }

    }
}

class Cache {
    user = new UserCache();
}

module.exports = new Cache();