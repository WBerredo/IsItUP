if(process.argv.length<3) {
    console.error("Usage: node index.js telegram_token");
    process.exit(1);
}

let token = process.argv[2];

let http = require('http');
let https = require('https');
let TelegramBot = require('node-telegram-bot-api');
let telegram = new TelegramBot(token, {polling: true});

// possibilities Regex
let startRegex = /\/start/;
let urlRegex = /^(http(s)?(:\/\/))?(www\.)?[a-zA-Z0-9-_\.]+(\.[a-zA-Z0-9]{2,})([-a-zA-Z0-9:%_\+.~#?&//=]*)/;
let verifyUrlRegex = /\/verify\s(http(s)?(:\/\/))?(www\.)?[a-zA-Z0-9-_\.]+(\.[a-zA-Z0-9]{2,})([-a-zA-Z0-9:%_\+.~#?&\/\/=]*)/

console.log("Running!")

// first message
telegram.onText(startRegex, (msg, match) => {
    username = msg.from.first_name;
    firstMessage = `Hi ${username}, I'm the Is it UP bot, my mission is tell you if any website is up or down.`;
    secondMessage = `You can use the command /verify www.myurl.com or just type your url to verify the current status.`;

    telegram.sendMessage(msg.chat.id, firstMessage);
    telegram.sendMessage(msg.chat.id, secondMessage);
});

// verify urls
telegram.onText(urlRegex, verify);
telegram.onText(verifyUrlRegex, (msg, match) => {
    match[0] = match[0].split(' ')[1];
    verify(msg, match);
});

// not found
telegram.onText(/.*/, (msg, match) => {
    if(!match[0].match(urlRegex)
    && !match[0].match(verifyUrlRegex)
    && !match[0].match(startRegex) ) {
        console.log("error: " + match[0]);
        telegram.sendMessage(msg.chat.id, "Sorry, I didn't understand what you said! Try to pass an URL :D");
    }
});


function verify(msg, match) {
//  setup according url
    let request = http;
    url = match[0];

    if(match[2]=="s") {
        request = https;
    } else if(match[1]==undefined) {
        url = "http://" + url;
    }
    console.log(URL);

    request.get(url, res => {
      telegram.sendMessage(msg.chat.id, url + " is up :D");
    }).on('error', e => {
      telegram.sendMessage(msg.chat.id, url + " is down :(");
    });
}
