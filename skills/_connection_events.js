/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {

    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);

    function conductOnboarding(bot, message) {

      bot.startConversation(message, function(err, convo) {

        convo.say(' Hola! ¿Cómo estás?');

        convo.say({
          text: '¿Puedo ayudarte a localizar algún artículo o herramienta de nuestro amplio catálogo?',
          quick_replies: [
            {
              title: 'Sí',
              payload: 'catalogo',
            },
            {
              title: 'No',
              payload: 'no',
            }
          ]
        });
      });

    }

    controller.hears('no','message_received', function(bot, message) {
      bot.reply(message,'Es una pena, pero en caso de que cambie de opinión, por favor contáctenos a través del siguiente formulario : \n\n[Utilice ésta forma para dejar su consulta](https://casacraviotoeshop.com/contacto/)');
    });

    controller.hears(['catalogo', 'catálogo', 'si', 'SI', 'sí', 'SÍ'], 'message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {

        // set up a menu thread which other threads can point at.
        convo.ask({
          text: 'Puedo mostrarle dos de nuestras principales categorías o conectarlo con un agente de ventas que pueda ayudarlo.',
          quick_replies: [
            {
              title: 'Plomería',
              payload: 'plomeria',
            },
            {
              title: 'Eléctricos',
              payload: 'electricos',
            },
            {
              title: 'Contactar Agente',
              payload: 'contacto',
            },
          ]
        },[
          {
            pattern: 'plomeria',
            callback: function(res, convo) {
              convo.gotoThread('plomeria');
              convo.next();
            }
          },
          {
            pattern: 'electricos',
            callback: function(res, convo) {
              convo.gotoThread('electricos');
              convo.next();
            }
          },
          {
            pattern: 'contacto',
            callback: function(res, convo) {
              convo.gotoThread('contacto');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.gotoThread('end');
            }
          }
        ]);

        // set up docs threads
        convo.addMessage({
          text: 'No se cómo ayudarle con eso, pero en el siguiente sitio puede encontrar más información de lo que ofrecemos \n\n[Casa Cravioto](https://casacraviotoeshop.com/)\n\n'
        },'end');
                
        // set up docs threads
        convo.addMessage({
          text: 'Tenemos lo que necesitas para plomería, mira el siguiente links:\n\n[Plomería](https://casacraviotoeshop.com/plomeria.html)\n\n',
        },'plomeria');

        convo.addMessage({
          action: 'default'
        }, 'plomeria');


        // set up community thread
        convo.addMessage({
          text: 'Casa Cravioto empresa 100% mexicana inicia operaciones en 1986 dedicada al suministro de productos ferreteros creando el concepto “Siempre Al Mejor Precio”.Actualmente contamos con presencia comercial a nivel nacional atendiendo el mercado a través de mostradores, tiendas de autoservicio, telemarketing, tienda en línea y vendedores presenciales',
        },'electricos');

        convo.addMessage({
          text: 'Somos una empresa ferretera que ofrece a sus clientes una amplia variedad de productos, con suministro oportuno y a un precio competitivo, cimentada en procesos eficaces con un enfoque de mejora continua y sostenibilidad.',
        },'electricos');

        convo.addMessage({
          text: 'Mira nuestra categoría de eléctricos en [Cravioto Electrico](https://casacraviotoeshop.com/electrico.html)',
        },'electricos');

        convo.addMessage({
          action: 'default'
        }, 'electricos');

        // set up contact thread
        convo.addMessage({
          text: 'Por favor, déjanos tu correo y el producto que deseas. Para tal fin, \n\n[utilice ésta forma para dejar su consulta](https://casacraviotoeshop.com/contacto/) y en breve lo contactaremos, gracias por su respuesta.',
        },'contacto');
        convo.addMessage({
          action: 'default'
        }, 'contacto');

      });

    });


}
