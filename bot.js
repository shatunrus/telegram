var TelegramBot = require('node-telegram-bot-api');
var token = 'tocken';
var fs = require('fs');
var http = require('http');
var iconv = require('iconv-lite');
var winston = require('winston');
var imagesnap = require('imagesnap');
var imageStream = fs.createWriteStream('/tmp/capture.jpg'); 
var botOptions = {
    polling: true
};
var options = {
    host: "bash.im",
    port: 80,
    path: "/forweb/"
};
var cb = {
    host: "www.cbr.ru",
    port: 80,
    path: "/scripts/XML_daily.asp?"

}
var cb_content = "";
var bot = new TelegramBot(token, botOptions);
 
bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});
 
bot.on('text', function(msg)
{   
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if (dd<10) { dd='0'+dd }
    if (mm<10) { mm='0'+mm }
    var logpath = '/var/log/telegram/' + yyyy + '/' + mm + '/' + dd + '/';
    var userId = msg.from.id;
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
    var messageUsrName = msg.from.first_name;
    var count;
    var chatname = msg.chat.title + '.log';
    var patt1 = /[r|R][p|P][d|D]...{1,3}-[1-9][0-9]{0,3}/g;
    var usrarray = [ ["dshatov", "Дима"], ["asosnov", "Саня"], ["ikashirin", "Игорян"], ["vkuhtenkov", "Володя"], ["СБЖ", "Серега"] ];
    var imgs = fs.readdir('/var/www/img/src');
    // End of VAR sections //
    // Parse text now: //
    if (messageText.toLowerCase().indexOf('RPD'.toLowerCase()) >=0 ){
       if (messageText.match(patt1)) { 
            for (count = 0; count < messageText.match(patt1).length; ++count) {
            pattext = messageText.match(patt1)[count].toUpperCase();
            sendMessageByBot(messageChatId, 'https://jira.osmp.ru/browse/' + pattext);
            }
        } else {
            sendMessageByBot(messageChatId, 'Какую-то хуйню вы пишете, а не номер тикета, вот сами его и ищите');
        }
    }    
    
    if (messageText.indexOf('/fuck@') >= 0) {   				
        for (var i = 0; i < usrarray.length; ++i) {   				
            if (messageText.indexOf(usrarray[i][0]) >=0 ) {    			
              sendMessageByBot('-169161878', usrarray[i][1] + ', БЛЯДЬ!!!');  	
            } 
        }
    }

    if (messageText.indexOf('@NKOBot') >= 0) {
        var sorryarr = [ 'Прости, я просто набор ноликов и единичек',
                         'Извини, я пока еще не очень умный бот',
                         'Хватит разговарить с компьютером. Тем более, что я еще не умею осмысленно отвечать',
                         'Ой все!'];
        var sorry = sorryarr[Math.floor(Math.random() * sorryarr.length)];
        sendMessageByBot(messageChatId, sorry);
    }

    switch (messageText) {
      case '/help':
      case '/pmp':
      case '/dima':
        sendMessageByBot(messageChatId, 'function deprecated');
        break;
      case '/buhashko':
        var buharray = [ 'Меня только снаружи спиртом протирать можно, я же все-таки робот. А вот вам, господа, изнутри освежиться надо. Тем более ',
                         'От работы дохнут кони, давайте лучше забухаем? Тем более ',
                         'С детства мечтал писать стихи как Есенин, но пока получается только так же бухать. Забухни классически, тем более '];
        var randbuh = buharray[Math.floor(Math.random() * buharray.length)];
        sendMessageByBot('-169161878', randbuh + messageUsrName + ' aka @' + messageUsr + '  предлагает' );
        if (messageChatId != '-169161878') {
          sendMessageByBot(messageChatId,'Сообщение отправлено админам. Спасибо');
        }
        break;
      case '/team':
        gamers = ['Артём', 'Семен', 'Юра', 'Дима'];
        var shuffle = require('shuffle-array'); 
        shuffle(gamers);
        sendMessageByBot(messageChatId, 'CT: ' + gamers[0] + ', ' + gamers[1] + '\nTerrors: ' + gamers[2] + ', ' + gamers[3]); 
        break;
      case '/img':
        fs.readdir('/var/www/img/src/',function(err, items) {
           var randg = items[Math.floor(Math.random() * items.length)];
           var img = '/var/www/img/src/' + randg;
           bot.sendPhoto(messageChatId, img, { caption: 'random image: ' + randg });
        });
        break;
      case 'Снегурочка, покажи что-нибудь красивое':
           fs.readdir('/var/www/img/siske/',function(err, items) {
           var randg = items[Math.floor(Math.random() * items.length)];
           var img = '/var/www/img/siske/' + randg;
           bot.sendPhoto(messageChatId, img, { caption: 'Наслаждайся, ' + messageUsrName });
        });
        break;
      case 'сиськиписьки':
          path = '/var/www/img/siske/';
          fs.readdir(path, function(err, items) {
          var shuffle = require('shuffle-array');
          shuffle(items);
            for (var i=0; i<items.length; i++) {
                bot.sendPhoto(messageChatId, path + '' + items[i]);
                console.log(path + '' + items[i]);
              }
          });
        break;
      case 'Снегурочка, нахуячь Максу шлюз':
        fs.readdir('/var/www/img/shluz/',function(err, items) {
           var randg = items[Math.floor(Math.random() * items.length)];
           var img = '/var/www/img/shluz/' + randg;
           bot.sendPhoto(messageChatId, img, { caption: 'Да легко!'});
        });
        break;
      case '/bash':
        sendRandomBashImQuote(messageChatId);
        break;
      case '/getchatid':
        sendMessageByBot(messageChatId, 'ChatID: ' + messageChatId);
        break;
      case '/admintools':
        sendMessageByBot(msg.from.id, 'пароль введи, ага?');
        break;
      case "/bablo":
        updateGlobalCurrencyList(messageChatId);
        break;
      case "news":
        sendMessageByBot('-169161878', 'Привет! Я снегурочка и у меня появились новые красивые картиночки!\nМогу показать какую-нибудь случайную, если попросишь');
        break;
      case "idtest":
        var idarr = ['157463308', '234602707', '213176399', '235386831'];
        idarr.forEach(function(i){
           fs.readdir('/var/www/img/siske/',function(err, items) {
           var randg = items[Math.floor(Math.random() * items.length)];
           var img = '/var/www/img/siske/' + randg;
           bot.sendPhoto(i, img, { caption: 'ChatIDFrom: ' + msg.chat.id + ' -> ChatIDTo: ' + i + '\nЯ ожила!'});
           });
         });
         
        break;
    };
    //Логирование
    if (!fs.existsSync(logpath)) { fs.mkdirSync(logpath); } 
    if (msg.chat.title == undefined) { chatname = msg.from.first_name + '_' + msg.from.last_name + '.log'; }

    var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ 
          filename: logpath + chatname 
          })
      ]
    });

    logger.log('info', '%s', msg.from.first_name + ' ' + msg.from.last_name + ': ' +  messageText);
});

//Аналог crontab
//научим бота матчить текст, перегоняя сообщение в массив
var notes = [];
bot.onText(/\/cron (.+) at (.+)/, function(msg, match){
  var userId = msg.from.id;
  var text = match[1];
  var time = match[2];
  notes.push({'uid':userId, 'time':time, 'text':text});
  bot.sendMessage(msg.chat.id, 'Ок, я запомнилa');

  setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if (notes[i]['time'] == curDate) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что: ' + notes[i]['text']);
                notes.splice(i,1);
            }
        }
  },1000);
  console.log(notes);
});


//function section

function sendRandomBashImQuote(aMessageChatId)
{
    http.get(options, function(res) {
        res.pipe(iconv.decodeStream('win1251')).collect(function(err, decodedBody) {
            var content = getQuoteBlockFromContent(decodedBody);
            content = DelTag(content[1]);
            sendMessageByBot(aMessageChatId, content);
        });
    });
}
 
function DelTag(aString)
{
    var cleanQuote = replaceAll(aString, "<' + 'br>", '\n');
    cleanQuote = replaceAll(cleanQuote, "<' + 'br />", '\n');
    cleanQuote = replaceAll(cleanQuote, '&quot;', '\"');
    cleanQuote = replaceAll(cleanQuote, '- ', '— ');
    cleanQuote = replaceAll(cleanQuote, '--', '—');
    cleanQuote = replaceAll(cleanQuote, '&gt;', '>');
    cleanQuote = replaceAll(cleanQuote, '&lt;', '<');
    return cleanQuote;
}
 
function replaceAll(aString, aFingString, aReplaceString)
{
    return aString.split(aFingString).join(aReplaceString);
}
 
function getQuoteBlockFromContent(aString)
{
    var quoteBlock = aString.replace('<\' + \'div id="b_q_t" style="padding: 1em 0;">', '__the_separator__');
    quoteBlock = quoteBlock.replace('<\' + \'/div><\' + \'small>', '__the_separator__');
    return quoteBlock.split('__the_separator__');
}

function updateGlobalCurrencyList(aMessageChatId)
{
    var req = http.request(cb, function(res) {
        res.setEncoding("utf8");
        res.on("data", function(chunk) {
            cb_content += chunk;
        });
        res.on("end", function() {
            sendMessageByBot(aMessageChatId, shittyParseXML(cb_content));
        });
    });
    req.end();
}

function generateBotAnswer(aCurrencyList)
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if (dd<10) { dd='0'+dd }
    if (mm<10) { mm='0'+mm }

    var currencyTable = 'Текущий курс на ' + dd + '.' + mm + ':\n\n';
    currencyTable += 'USD = ' + aCurrencyList.USD + ' ' + 'RUB' + ';\n';
    currencyTable += 'EUR = ' + aCurrencyList.EUR + ' ' + 'RUB' + ';\n';
    currencyTable += 'BYN = ' + aCurrencyList.GBP + ' ' + 'RUB' + ';\n';
    return currencyTable;
}

function shittyParseXML(aAllXml)
{
    var currencyList = {
        'USD': 0.0,
        'EUR': 0.0
    };

    currencyList.USD = getCurrentValue('USD', aAllXml);
    currencyList.EUR = getCurrentValue('EUR', aAllXml);
    currencyList.GBP = getCurrentValue('BYN', aAllXml);
    return generateBotAnswer(currencyList);
}

function getCurrentValue(aCurrency, aString)
{
    var nominal = parseFloat(replaceCommasByDots(getStringBelow(aString.indexOf(aCurrency), 1, aString)));
    var value = parseFloat(replaceCommasByDots(getStringBelow(aString.indexOf(aCurrency), 3, aString)));
    return (value / nominal).toFixed(2);
}

function removeTags(aString)
{
    return aString.replace(/(<([^>]+)>)/ig, '');
}

function getStringBelow(aStart, aBelow, aString)
{
    var textSize = aString.length;
    var countOfLineEndings = 0;
    var getLineWith = 0;
 
    for (var i = aStart; i < textSize; ++i) {
        if (countOfLineEndings === aBelow) {
            getLineWith = i;
            break;
        }
        if (aString[i] === '\n') {
           countOfLineEndings++;
        }
    }
     return getLineFromXml(getLineWith, aString);
}

function replaceCommasByDots(aString)
{
    return aString.replace(',', '.');
}
 
function getLineFromXml(aStart, aString)
{
    var textSize = aString.length;
    var targetString = '';
    for (var i = aStart; i < textSize; ++i) {
        if (aString[i] === '\n') {
            break;
        }
        targetString += aString[i];
    }
 
    return removeTags(targetString.trim());
}

function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a bot!' });
}
