var TelegramBot = require('node-telegram-bot-api');
var token = '258599773:AAG8To7c962v7u1JhDIVnimrQoQAfvyXZnY';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);
 
bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});
 
bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
    var patt1 = /rpd...{1,5}-[1-9][0-9]{0,3}/g;
    var buharray = [ 'Меня только снаружи спиртом протирать можно, я же все-таки робот. А вот вам, господа, изнутри освежиться надо. Тем более ',
                     'От работы дохнут кони, давайте лучше забухаем? Тем более ',
                     'С детства мечтал писать стихи как Есенин, но пока получается только так же бухать. Забухни классически, тем более '];
    var sorryarr = [ 'Прости, я просто набор ноликов и единичек',
                     'Извини, я пока еще не очень умный бот',
                     'Хватит разговарить с компьютером. Тем более, что я еще не умею осмысленно отвечать'];
    var randbuh = buharray[Math.floor(Math.random() * buharray.length)];
    var sorry = sorryarr[Math.floor(Math.random() * sorryarr.length)];
    
    if (messageText === '/dima') {
        sendMessageByBot('-130011298', 'Дима, БЛЯДЬ!!!');
    }
    if (messageText === '/pmp') {
        sendMessageByBot('-130011298', 'Кто опять сломал PMP? ДИМА!!!!');
    } 
    if (messageText === '/buhashko') {
        sendMessageByBot('-130011298', randbuh + '@' + messageUsr + '  предлагает' );
    }
    if (messageText === '/help') {
        sendMessageByBot(messageChatId, 'Привет, ' +  messageUsr + '\n/dima\t--Ругнуться на разработчика\n/rpd<имя проекта>-<номер тикета> -- пропарсить в ссылку\n/pmp\t-- уточнить, что с PMP\n/buhashko -- думаю тут и так все понятно\n/help\t-- вывести это сообщение');
    }
    if (messageText.indexOf('/rpd') >= 0) {
         if (messageText.match(patt1)) { 
    	    sendMessageByBot(messageChatId, 'https://jira.osmp.ru/browse' + messageText.toUpperCase());
         } else {
	    sendMessageByBot(messageChatId, 'Какую-то хуйню вы пишете, а не номер тикета, сами его и ищите');
         }
    }
    if (messageText.indexOf('/fuck@') >= 0) {
         if (messageText.indexOf(messageUsr) >=0) { 
    	    sendMessageByBot(messageChatId, messageUsr + ', БЛЯДЬ!!!');
         } else {
	    sendMessageByBot(messageChatId, 'А так хотелось кого-то послать');
         }
    }
    if (messageText.indexOf('@RapidaCron_bot') >= 0) {
        sendMessageByBot(messageChatId, sorry);
    }
   console.log(msg);
});
 
function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a bot!' });
}

