if (process.env.IS_IT_UP_TOKEN == undefined) {
    console.error("You have to set the environment variable IS_IT_UP_TOKEN with your telegram token.");
    process.exit(1);
}

let token = process.env.IS_IT_UP_TOKEN;
let trackFeature = process.env.IS_IT_UP_TRACK && process.env.IS_IT_UP_TRACK == 'true';

console.log("Running! \u{1F604}");

// External Modules
let TelegramBot = require('node-telegram-bot-api');
let telegram = new TelegramBot(token, {
    polling: true,
    onlyFirstMatch: true
});

// My Modules
let Regex = require('./util/Regex.js');
let Message = require('./util/Message.js');
let Verifier = require('./feature/Verifier.js');

// first message
telegram.onText(Regex.startRegex, (msg, match) => {
    msgId = msg.chat.id;

    telegram.sendMessage(msgId, Message.welcomeFirstStep(msg.from.first_name));
    telegram.sendMessage(msgId, Message.welcomeSecondStep);
});

// verify urls
telegram.onText(Regex.urlRegex, (msg, match) => {
    Verifier.verifyUrl(msg, match, verifyCallback);
});
telegram.onText(Regex.verifyUrlRegex, (msg, match) => {
    match[0] = match[0].split(' ')[1];
    Verifier.verifyUrl(msg, match, verifyCallback);
});

function verifyCallback(msg, url, success, statusCode) {
    if (success) {
        //      status code of client or server error
        if (statusCode >= 400 && statusCode < 600) {
            telegram.sendMessage(
                msg.chat.id,
                Message.clientOrServerErrorStatus(url, statusCode)
            );
        } else {
            //      seems successful
            telegram.sendMessage(msg.chat.id, Message.successStatus(url));
        }
    } else {
        //      seems down
        telegram.sendMessage(msg.chat.id, Message.errorStatus(url));
    }
}

// just verify
telegram.onText(Regex.justVerifyRegex, (msg) => {
    telegram.sendMessage(msg.chat.id, Message.verifyHowToUse);
})

// not found
telegram.on('message', msg => {
    let textMessage = msg.text;
    let chatId = msg.chat.id;

    // verify if match with any regex from user
    if (textMessage == undefined || Regex.isRegexMatch(textMessage)) return;


    // Verify if its a group call
    if (Regex.usernameCallRegex.exec(textMessage) &&
        (match = Regex.usernameCallLinkRegex.exec(textMessage))
    ) {
        match[0] = match[0].split(' ')[1];
        Verifier.verifyUrl(msg, match, verifyCallback);
    } else if (Regex.usernameCallRegex.exec(textMessage) || msg.chat.type != 'group') {
        // Group call without link or not a group call
        console.log("error: " + textMessage);
        telegram.sendMessage(chatId, Message.didntUnderstand);
    }
});


// track feature
if (trackFeature) {
    console.log("with track feature");
    var track = new(require('./feature/Track'))();

    //  receive a track request
    telegram.onText(Regex.trackUrlRegex, (msg, match) => {
        match[0] = match[0].split(' ')[1];
        Verifier.verifyUrl(msg, match, (msg, url, success, statusCode) => {
            verifyCallback(msg, url, success, statusCode);
            track.addUrl(url, msg.chat.id, success);

            console.log(`${url} added to track list`);
            telegram.sendMessage(msg.chat.id, Message.addedToTrackList(url));
            telegram.sendMessage(msg.chat.id, Message.trackListHowToUse);
        });
    });

    //receive a track list request
    telegram.onText(Regex.trackListRegex, (msg, match) => {
        track.getAllFromUser(msg.chat.id, (msgId, urls) => {
            telegram.sendMessage(msgId, Message.getListMessage(urls));
        });
    });

    //  setup verification
    track.scheduleVerification((url, msgId, status) => {
        if (status) {
            telegram.sendMessage(msgId, Message.successStatus(url) + Message.checkedAt);
        } else {
            telegram.sendMessage(msgId, Message.errorStatus(url) + Message.checkedAt);
        }
    });
}
