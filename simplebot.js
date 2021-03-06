//for CentOS:
//yum install nodejs nmp
//npm install node-telegram-bot-api
//npm install request
//
//start - node <your app>
//

var TelegramBot = require('node-telegram-bot-api');
 
var token = 'WRITE_YOUR_TOKEN_HERE';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);
 
bot.getMe().then(function(me)
{
    console.log('Bot name is %s!', me.first_name);
    console.log('Bot id is %s.', me.id);
    console.log('Bot username is @%s.', me.username);
});
 
bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
 
    if (messageText === '/hi') {
        sendMessageByBot(messageChatId, 'Hi, ' + messageUsr  + '!\nI\'m simple bot');
    }
 
    console.log(msg);
});
 
function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'Sorry, i\'m bot' });
}
