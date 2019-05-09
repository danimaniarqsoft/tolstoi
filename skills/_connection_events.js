/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  controller.on('hello', firstTime);
  controller.on('welcome_back', firstTime);

  function firstTime(bot, message) {

    bot.startConversation(message, function (err, convo) {
      var personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
      convo.say('Hola! ¿Cómo estás?');
      convo.say('Mi nombre es ' + personal[getRandomInt(0, 6)]);
      convo.say('¿Puedo ayudarte a localizar algún artículo o herramienta de nuestro amplio catálogo?');
    });
  }
}
