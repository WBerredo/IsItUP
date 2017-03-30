class Track {
    constructor() {
        this._urlTrack = require('../model/UrlTrack.js');
        this._verifier = require('../feature/Verifier.js');
        this._regex = require('../util/Regex.js');

        if (process.env.IS_IT_UP_FIREBASE_PRIVATE_KEY == undefined ||
            process.env.IS_IT_UP_FIREBASE_CLIENT_EMAIL == undefined ||
            process.env.IS_IT_UP_FIREBASE_DATABASE_URL == undefined
        ) {
            let message = "You have to your firebase credentials at " +
                "environment variables IS_IT_UP_FIREBASE_PRIVATE_KEY, " +
                "IS_IT_UP_FIREBASE_CLIENT_EMAIL and  IS_IT_UP_FIREBASE_DATABASE_URL";
            console.error(message);
            process.exit(1);
        }

        this._firebase = require('firebase-admin');
        this._firebase.initializeApp({
            credential: this._firebase.credential.cert({
                privateKey: process.env.IS_IT_UP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                clientEmail: process.env.IS_IT_UP_FIREBASE_CLIENT_EMAIL
            }),
            databaseURL: process.env.IS_IT_UP_FIREBASE_DATABASE_URL
        })

        this._schedule = require('node-schedule');
    }

    /**
     * Schedule verification in a specific time.
     * Default: Every 30 minutes
     */
    scheduleVerification(callback, time = '*/5 * * * *') {
        this._schedule.scheduleJob(time, () => {
            console.log("Verifying track list...");
            let ref = this._firebase.database().ref('track/');
            ref.once('value', snapshot => {
                let values = snapshot.val();

                // Iterate each user
                for (let msgId in values) {
                    let urls = values[msgId];

                    // Iterate each url from user
                    for (let itemKey in urls) {
                        let urlItem = urls[itemKey];

                        // emulate a msg obj
                        let msg = new Object();
                        msg.chat = new Object();
                        msg.chat.id = msgId;

                        this._verifier.verifyUrl(
                            msg,
                            this._regex.urlRegex.exec(urlItem.url),
                            (msg, url, success, statusCode) => {
                                if (success != urlItem.status) {
                                    callback(url, msgId, success);
                                    this.setUrl(url, msgId, success, itemKey);
                                }
                            });
                    }
                }
            });
        });
    }

    /**
     * Add Url to track
     */
    addUrl(url, msgId, currentStatus) {
        let ref = this._firebase.database().ref('track/' + msgId);
        let urlTrack = new this._urlTrack(url, currentStatus);

        ref.push(urlTrack);
    }

    /**
     * Set an url item
     */
    setUrl(url, msgId, currentStatus, itemId) {
        let ref = this._firebase.database().ref(`track/${msgId}/${itemId}`);
        let urlTrack = new this._urlTrack(url, currentStatus);

        ref.update(urlTrack);
    }


    /**
     * Get all tracked urls
     */
    getAllFromUser(msgId, callback, justUrls = true) {
        let ref = this._firebase.database().ref(`track/${msgId}`);
        ref.once("value", snapshot => {
            let urlList = [];
            let urls = snapshot.val();

            if (!justUrls) {
                callback(msgId, urls);
                return;
            }

            // Iterate each url from user
            for (let itemKey in urls) {
                let urlItem = urls[itemKey];
                urlList.push(urlItem.url);
            }

            callback(msgId, urlList);
        });
    }

    /**
     * Generate a keyboard with all tracked urls
     */
    getAllUrlsKeyBoard(msgId, callback) {
        this.getAllFromUser(msgId, (msgId, urls) => {
            const urlOpts = [];
            for (let itemKey in urls) {
                let urlItem = urls[itemKey];
                urlOpts.push([{
                    text: urlItem.url,
                    callback_data: itemKey
                }]);
            }

            if (urlOpts.length == 0) {
                callback(null);
                return;
            }

            const keyboard = {
                reply_markup: {
                    inline_keyboard: urlOpts
                }
            };

            callback(keyboard)
        }, false);
    }

    // delete an url
    deleteUrl(msgId, itemId, callback) {
        this._firebase.database().ref(`track/${msgId}/${itemId}`).remove(error => {
            callback(!error, msgId);
        });
    }
}

module.exports = Track;
