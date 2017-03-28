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
}

module.exports = Message;
