module.exports = function (controller) {
  controller.hears(['contacto'], 'message_received', function(bot,message) {
    // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {
    convo.setTimeout(10000);
    convo.onTimeout(function(convo) {
      convo.say('Parece que te has distraido, no te preocupes, podemos platicar en otro momento.');
      convo.next(); 
    });
    convo.say("Con mucho gusto");
    convo.say("para ponerte en contacto directo con nosotros, por favor, llena la siguiente forma web:");
    convo.say("[Contacto Casa Cravioto](https://casacraviotoeshop.com/contacto/)");
    convo.say("o si lo prefieres, puedo enviarte información a tu correo electrónico.");
    convo.ask('Por favor, índicame en que correo electrónico te puedo contactar', function(response, convo) {
			convo.setVar('correo',response.text);
			convo.say('Muy bien, en breve te contactamos en ' + response.text);
			convo.next();
		});
  })
  });
}