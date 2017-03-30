class Regex {
    static get _urlRegexString() {
        return "(?:(http(s)?|ftp):\\/\\/)?(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)" +
            "(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5]))" +
            "{2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)" +
            "*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*" +
            "[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)" +
            "(?::\\d{2,5})?(?:[/?#]\\S*)?";
    }

    static get _botUsernameRegexString() {
        return "^@Is_it_UPBot\\s";
    }

    static get _verifyCommandString() {
        return "\/verify";
    }

    static get _trackCommandString() {
        return "\/track";
    }

    static get startRegex() {
        return /\/start/;
    }

    static get urlRegex() {
        return new RegExp("^" + Regex._urlRegexString);
    }

    static get verifyUrlRegex() {
        return new RegExp(Regex._verifyCommandString + "\\s" + Regex._urlRegexString);
    }

    static get justVerifyRegex() {
        return new RegExp(Regex._verifyCommandString + "$");
    }

    static get trackUrlRegex() {
        return new RegExp(Regex._trackCommandString + "\\s" + Regex._urlRegexString);
    }

    static get trackListRegex() {
        return /^\/track_list$/;
    }

    static get usernameCallRegex() {
        return new RegExp(Regex._botUsernameRegexString);
    }

    static get usernameCallLinkRegex() {
        return new RegExp(Regex._botUsernameRegexString + Regex._urlRegexString);
    }

    static isRegexMatch(textMessage) {
        return textMessage != undefined &&
            (textMessage.match(Regex.urlRegex) ||
                textMessage.match(Regex.verifyUrlRegex) ||
                textMessage.match(Regex.startRegex) ||
                textMessage.match(Regex.justVerifyRegex) ||
                textMessage.match(Regex.trackUrlRegex) ||
                textMessage.match(Regex.trackListRegex)
            );
    }
}

module.exports = Regex;
