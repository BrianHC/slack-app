Getting started

1. create a slack app: https://api.slack.com/apps
2. in app settings turn on socket mode
3. create slash commands "/clap"
4. set the following bot scopes:
- channels:history
- channels:join
- channels:manage
- channels:read
- chat:write
- chat:write.customize
- chat:write.public
- commands
- groups:write
- im:write
- users.profile:read
- users:read
5. install the application to your workspace

Running the code:

1. run `npm install` (if running for first time)
2. setup the environmental variables file (create a file named ".env")
3. add keys and values for: "BOT_TOKEN" and "APP_TOKEN" in the .env file
4. run `npm start` 