# IsItUP? Bot
<img src="logo.jpg" width="48px">
Telegram bot to verify if a website is up or track an URL to be notified when it gets down. https://t.me/Is_it_UPBot

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
4. (Optional) Setup Firebase. (If you want the [track feature](#track-if-enabled))
    * [Create a Firebase project and download the credentials](https://firebase.google.com/docs/server/setup)
    * Set environment variables called IS_IT_UP_FIREBASE_PRIVATE_KEY,
    IS_IT_UP_FIREBASE_CLIENT_EMAIL and  IS_IT_UP_FIREBASE_DATABASE_URL with your firebase credentials (private key and client email are in the downloaded file)
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

### Track (if enabled)
* To track an URL, you have to type:
```
/track https://telegram.org
```

* To delete an URL from the track list you have to type:
```
/track_delete
```
and then click at the URL you want to delete

* To get a list of URLs you are tracking:
```
/track_list
```

Every 5 minutes the bot will run a check at  track list, if the status of an URL get changed(up->down, down->up), the user will be notified.

### Group
* [Invite](http://stackoverflow.com/a/40175742) the bot to a group

* Call it by name and tell the domain
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

* [isitup.org](https://isitup.org/) - for the concept
* [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) - for provide an easy way to create a telegram bot


## License
[MIT](LICENSE.md)
