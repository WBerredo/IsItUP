if(process.env.IS_IT_UP_TOKEN==undefined) {
    console.error("You have to set the environment variable IS_IT_UP_TOKEN with your telegram token.");
    process.exit(1);
}

let token = process.env.IS_IT_UP_TOKEN;

let http = require('http');
let https = require('https');
let TelegramBot = require('node-telegram-bot-api');
let telegram = new TelegramBot(token, {polling: true, onlyFirstMatch: true});

// possibilities Regex
let commandString  = "\/verify"
let urlString = "(http([s])?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}"
let botUsernameCallString = "^@Is_it_UPBot\\s";

let startRegex = /\/start/;
let urlRegex = new RegExp("^" + urlString);
let verifyUrlRegex = new RegExp(commandString + "\\s" + urlString);
let justVerifyRegex = new RegExp(commandString + "$");
let usernameCallRegex = new RegExp(botUsernameCallString);
let usernameCallLinkRegex = new RegExp(botUsernameCallString + urlString);

// Messages
let didntUnderstand = "Sorry, I didn't understand what you said! Try to pass an URL :D";
let verifyHowToUse = "To use /verify command you have to pass an URL. Ex: /verify telegram.org";

console.log("Running! \u{1F604}")

// first message
telegram.onText(startRegex, (msg, match) => {
    username = msg.from.first_name;

    let welcomeFirstMsg  = `Hi ${username}, I'm the Is it UP bot, my mission is tell you if any website is up or down.`;
    let welcomeSecondMsg = `You can use the command /verify telegram.org/ or just type your url to verify the current status.`;

    telegram.sendMessage(msg.chat.id, welcomeFirstMsg);
    telegram.sendMessage(msg.chat.id, welcomeSecondMsg);
});

// verify urls
telegram.onText(urlRegex, verify);
telegram.onText(verifyUrlRegex, (msg, match) => {
    match[0] = match[0].split(' ')[1];
    verify(msg, match);
});

// just verify
telegram.onText(justVerifyRegex, (msg) => {
    telegram.sendMessage(msg.chat.id, verifyHowToUse);
})

// not found
telegram.on('message', msg => {
    let textMessage = msg.text;
    let chatId = msg.chat.id;

    if(textMessage != undefined
    && !textMessage.match(urlRegex)
    && !textMessage.match(verifyUrlRegex)
    && !textMessage.match(startRegex)
    && !textMessage.match(justVerifyRegex) ) {
        if(usernameCallRegex.exec(textMessage)) {
              if(match = usernameCallLinkRegex.exec(textMessage)) {
                  match[0] = match[0].split(' ')[1];
                  verify(msg, match);
              } else {
                  telegram.sendMessage(chatId, didntUnderstand);
              }
        } else if(msg.chat.type!='group') {
            console.log("error: " + textMessage);
            telegram.sendMessage(chatId, didntUnderstand);
        }
    }
});


function verify(msg, match) {
//  setup according url
    let request = http;
    url = match[0];

    if(url.match(justVerifyRegex)) return;

    if(match[2]=="s") {
        request = https;
    } else if(match[1]==undefined) {
        url = "http://" + url;
    }

    console.log("URL: " + url);

    request.get(url, res => {
        telegram.sendMessage(msg.chat.id, url + " is up \u{1F604}");
    }).on('error', e => {
        telegram.sendMessage(msg.chat.id, url + " is down \u{1F614}");
    });
}
