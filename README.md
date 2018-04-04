# IsItUP? Bot
> A Telegram bot that verifies whether or not a website is up, tracks URLs and notifies when hosts have unreachable connections. https://t.me/Is_it_UPBot

<img src="logo.jpg" width="48px" />

## Installation

1. Meet [IsItUP?](https://t.me/Is_it_UPBot) at telegram :D

### or run your own bot
1. Clone the project
2. Go to your IsItUp directory
```bash
cd /path/to/IsItUP/
```

3. Set an enviroment variable named `IS_IT_UP_TOKEN` with your telegram token.
Read this [great article](https://www.schrodinger.com/kb/1842) and learn how to do it properly.
On bash:
```bash
export IS_IT_UP_TOKEN=your_telegram_token
```
4. (Optional) Setup Firebase if you want to enable the [track feature](#track-if-enabled))
    * [Create a Firebase project and download its credentials](https://firebase.google.com/docs/server/setup)
    * Set environment variables named `IS_IT_UP_FIREBASE_PRIVATE_KEY`,
    `IS_IT_UP_FIREBASE_CLIENT_EMAIL` and `IS_IT_UP_FIREBASE_DATABASE_URL` with your firebase credentials (private key and client email are in the downloaded file)
    ```bash
    export IS_IT_UP_FIREBASE_CLIENT_EMAIL=email@domain.com
    ```

5. Install [node and npm](https://docs.npmjs.com/getting-started/installing-node)

6. Download the dependencies
```bash
npm install
```

7. Run the script
```bash
npm start
```

## Usage

It can be done with [IsItUP?](https://t.me/Is_it_UPBot) bot or your own bot:

### Conversation

* Start a conversation with the bot
* Type:
```
/verify https://telegram.org
```
or just
```
https://telegram.org
```
to verify whether a website is available or not

### Track (if enabled)
* You may track an URL by typing: _// check step #4 for enabling tracking_
```
/track https://telegram.org
```

* You may delete an URL from the track list by typing:
```
/track_delete
```
and then click at the URL you want to delete

* To list the URLs you are tracking:
```
/track_list
```

Every 5 minutes the bot will check the track list. The user will be notified when the status of an URL get changed(up->down, down->up).

### Group
* You may as well [invite](http://stackoverflow.com/a/40175742) the bot to a group

* Call it by name and tell the domain you want to watch
```
@Is_it_UPBot https://telegram.org
```

PS: telegram.org is a sample (of course :D), type whatever you need.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Thanks

* [isitup.org](https://isitup.org/) - for the concepts and ideas
* [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) - for providing an easy way to create a telegram bot


## License
[MIT](LICENSE.md)
