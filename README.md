# IsItUP? Bot
Telegram bot to verify if a website is up. https://t.me/Is_it_UPBot

## Installation

1. Meet [IsItUP?](https://t.me/Is_it_UPBot) at telegram :D

### or run your own bot
1. Clone the project
2. Go to directory
```bash
cd IsItUP/
```

3. Set an enviroment variable called IS_IT_UP_TOKEN with your telegram token.
To learn how to do: read this [great article](https://www.schrodinger.com/kb/1842).
At bash:
```bash
export IS_IT_UP_TOKEN=your_telegram_token
```
4. Install [node and npm](https://docs.npmjs.com/getting-started/installing-node)

5. Download the dependencies
```bash
npm install
```

6. Run the script
```bash
npm start
```

## Usage

It can be done with [IsItUP?](https://t.me/Is_it_UPBot) bot or your own bot.

### Conversation

* Start a conversation
* Type:
```
/verify https://telegram.org
```
or just
```
https://telegram.org
```
to verify the availability of one website

### Group
* [Invite](http://stackoverflow.com/a/40175742) the bot to a group

* Call it by name and tell the domain
```
@Is_it_UPBot https://telegram.org
```

PS: telegram.org is a sample(of course :D), type whatever you need.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Thanks

* [isitup.org](https://isitup.org/) - for the concept
* [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) - for provide an easy way to create a telegram bot


## License
[MIT](LICENSE.md)
