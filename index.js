if(process.env.IS_IT_UP_TOKEN==undefined) {
    console.error("You have to set the environment variable IS_IT_UP_TOKEN with your telegram token.");
    process.exit(1);}

let token = process.env.IS_IT_UP_TOKEN;

// External Modules
let TelegramBot = require('node-telegram-bot-api');
let telegram = new TelegramBot(token, {polling: true, onlyFirstMatch: true});

// My Modules
let Regex = require('./util/Regex.js');
let Message = require('./util/Message.js');
let Verifier = require('./util/Verifier')

console.log("Running! \u{1F604}");

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
    if(success) {
//      status code of client or server error
        if(statusCode>=400 && statusCode<600) {
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

    if(textMessage != undefined
    && !textMessage.match(Regex.urlRegex)
    && !textMessage.match(Regex.verifyUrlRegex)
    && !textMessage.match(Regex.startRegex)
    && !textMessage.match(Regex.justVerifyRegex) ) {
        if(Regex.usernameCallRegex.exec(textMessage)) {
              if(match = usernameCallLinkRegex.exec(textMessage)) {
                  match[0] = match[0].split(' ')[1];
                  Verifier.verifyUrl(msg, match);
              } else {
                  telegram.sendMessage(chatId, Message.didntUnderstand);
              }
        } else if(msg.chat.type!='group') {
            console.log("error: " + textMessage);
            telegram.sendMessage(chatId, Message.didntUnderstand);
        }
    }
});
