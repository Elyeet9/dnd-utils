# DnD Utils
A silly bot that executes some util functions for DnD with some house rules

## Requirements
* [Node.js](https://nodejs.org/en)
* [Discord bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## How to install
Open a terminal and clone the repo in a directory of your choice:
```
https://github.com/Elyeet9/dnd-utils
```

Enter the repo folder and install the packages:

```
npm install
```

Now you need to create a file called `.env` and put the following line in it (replace your_token with your actual bot token):

```
DISCORD_TOKEN=your_token
```

Now you can execute the bot by running `node index.js` or by opening `dnd_utils.bat`.

## Commands
* **rollstats**: Roll your standard 4d6, keep three highest 6 times, but the minimum total is 70. The bot will reply with your rolls (using a format inspired by [Avrae](https://avrae.io/)) and a button so that you can keep re-rolling. 
