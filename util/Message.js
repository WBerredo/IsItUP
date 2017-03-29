class Message {
    static get didntUnderstand() {
        return "Sorry, I didn't understand what you said! Try to pass an URL :D";
    }

    static get verifyHowToUse() {
        return "To use /verify command you have to pass an URL. " +
            "Ex: /verify telegram.org";
    }

    static welcomeFirstStep(username) {
        return `Hi ${username}, I'm the Is it UP bot, my mission is tell you` +
            ` if any website is up or down.`;
    }

    static get welcomeSecondStep() {
        return `You can use the command /verify telegram.org or just type` +
            ` your url to verify the current status.`;
    }

    static successStatus(url) {
        return `${url} is up \u{1F604}`;
    }

    static errorStatus(url) {
        return `${url} is down \u{1F614}`;
    }

    static clientOrServerErrorStatus(url, statusCode) {
        return `${url} is responding, but the status code` +
            ` is ${statusCode} \u{1F633}`;
    }

    static addedToTrackList(url) {
        return `${url} added to Track List.` +
            ` You will receive an alert every time the status get changed.`;
    }

    static get trackListHowToUse() {
        return `To see a list of your tracked urls type: /track_list`;
    }

    static get checkedAt() {
        let moment = require('moment');
        let currentTime = moment().format('MMMM Do YYYY, h:mm:ss A');
        let timezone = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

        return ` Checked at ${currentTime} ${timezone}. `;
    }

    static getListMessage(urls) {
        switch (urls.length) {
            case 0:
                return `You don't have any tracked urls.`

            case 1:
                return `Your tracked url is: ${urls[0]}`;

            default:
                return `Your tracked urls are:\n${urls.join("\n")}`;
        }

    }
}

module.exports = Message;
