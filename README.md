# Alexa API Consumer

Este es un tutorial para crear un servidor de [express](https://expressjs.com/) 
que sera consultado por una función lambda alojada en el Amazon Web Service (AWS) que a su vez es consumida por un skill de Alexa.

## Prerequisitos

Antes de empezar necesitamos una cuenta de AWS.

 - Instala el [Alexa Skills Kit Command Line Interface (ASK CLI)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-cli-command-reference)
	```
	npm install -g ask-cli
	```
 -  Asocia tus credenciales de AWS con tu ask-cli Sigue [este](https://developer.amazon.com/es/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html) tutorial.
 - Instala los requerimientos para el servidor de Express
	```
	npm install
	```
## Servidor de Express
El proposito de este servidor de ejemplo es devolver 3 cartas de tarot. La primera carta te dice tu pasado, la segunda tu presente y la tercera tu futuro.
- El archivo de entrada es app.js.
- En models/cards.js hay un arreglo de objectos llamado **cards**, cada objeto contiene un **nombre** y un **significado**.
- in routes/router.js tenemos nuestro controlador para la dirección "/", junto con la get_random_cards(), obtiene del arreglo cards del punto anterior 3 cartas, la primera con el significado 0, la segunda con el significado 1, y la tercera con el signficado 3. Estos representan el pasado, presente y futuro.