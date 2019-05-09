module.exports = function (controller) {
  controller.on('message_received', function (bot, message) {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel).catch(function (err) {
      bot.reply(message, {
        text: 'Lo siento, No entiendo lo que me solicitas, pero te puedo contactar con un agente especializado que estará gustoso de atenderte',
        quick_replies: [
          {
            title: 'Contacto',
            payload: 'contacto',
          },
        ]
      });
    });
  });
}