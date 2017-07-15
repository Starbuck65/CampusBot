//TeleBot CV-UAB

const Telegraf = require('telegraf');
const request = require('request');


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', ({ from, reply}) => {
  console.log('start', from);
  return reply('Benvingut al bot de Telegram per consultar novetats al Campus Virtual de la UAB.\n'
  + 'Per més informació proveu amb /help.');
});

bot.command('help', ({ from, reply}) => {
  console.log('start', from);
  return reply(
    '"/start": Mostra el missatge de benvinguda.\n'
    + '"/consulta {NIU} {MOODLE_ID_ASSIGNATURA}": Retorna l\'estat de l\'assignatura en qüestió.\n'
  );
});

bot.command('consulta', (ctx) => {
  let cmd = ctx.message.text;
  console.log(cmd);

  let params = cmd.split(' ');
  let userId = params[1];
  let moodleId = params[2];

  // POST request with form elements 'niu' and 'ideds'
  request.post({url:'https://e-aules.uab.cat/2017-18/apsi/novetats.php',form:{
    niu:userId,
    ideds:moodleId
  }}, function(e, r, body) {
    ctx.reply(body);
  });
});

bot.startPolling()
