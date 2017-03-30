class Message {
    static get didntUnderstand() {
        return `Sorry, I didn't understand what you said! Try to pass an URL ` +
            `or use \/help command`;
    }

    static get verifyHowToUse() {
        return `To use /verify command you have to pass an URL. ` +
            `Ex: /verify telegram.org`;
    }

    static get trackHowToUse() {
        return `To use /track command you have to pass an URL to track. ` +
            `Ex: /track telegram.org`;
    }

    static welcomeFirstStep(username) {
        return `Hi ${username}, I'm the Is it UP bot, my mission is tell you` +
            ` if any website is up or down.`;
    }

    static get welcomeSecondStep() {
        return `We can chat by these commands:\n` +
            `\/verify yourdomain.com - Verify if an URL is up or down \n` +
            `\/track yourdomain.com - Track an URL and be notified when the status get changed\n` +
            `\/track_list - Get a list of all tracked URLs\n` +
            `\/track_delete - Delete an URL from the track list\n` +
            `You also can just type an URL to know if it's up or down.`;
    }

    static successStatus(url) {
        return `${url} is up \u{1F604}`;
    }

    static errorStatus(url) {
        return `${url} is down \u{1F633}`;
    }

    static clientOrServerErrorStatus(url, statusCode) {
        return `${url} is responding, but the status code` +
            ` is ${statusCode} \u{1F914}`;
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

    static get urlNotFound() {
        return `You don't have any tracked urls, to track an url use` +
            ` track command. Ex: /track domain.com`;
    }

    static get deleteSuccess() {
        return `This URL was removed. ${Message.trackListHowToUse}`;
    }

    static get deleteError() {
        return `Sorry, I can not remove this url. ${Message.trackListHowToUse}`;
    }

    static getListMessage(urls) {
        switch (urls.length) {
            case 0:
                return Message.urlNotFound;

            case 1:
                return `Your tracked url is: ${urls[0]}`;

            default:
                return `Your tracked urls are:\n${urls.join("\n")}`;
        }

    }
}

module.exports = Message;
