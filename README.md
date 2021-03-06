Mensch Ärger Dich Nicht - Web Technologien
=====================================

- [Präsentation](https://prezi.com/view/xmgZydWBJXCoDYWFiN6M/)
- [WebSockets](#websockets)
- [Authentication](#authentication)
- [Deployed](#deployed)

## WebSockets

- [Websockets in MenschController.scala](https://github.com/svantja/MenschAergerDichNicht_WT/blob/39b8456572e20c872ae38608614ee727adf11d45/app/controllers/MenschController.scala#L88)
  - Im Controller ``MenschController.scala`` wird ein WebSocket erstellt, welcher auf ein Event des Controllers(``PlayersChanged``) reagiert und dem Client eine Json Datei(umgewandelt in einen String) sendet.
  
- [WebSockets in mensch.js](https://github.com/svantja/MenschAergerDichNicht_WT/blob/39b8456572e20c872ae38608614ee727adf11d45/public/javascripts/mensch.js#L301)
  - In der Javascript Datei ``mensch.js`` wird die Verbindung hergestellt um die Json Datei zu empfangen, und so das Spielfeld zu aktualisieren.


## Authentication

Die Authentifizierung wurde mit dem [Silhouette Seed Template](#silhouette-seed-template) erstellt.
Die ``about`` und ``home`` Pages der Website sind auch ohne Authentifizierung erreichbar. Die restlichen Seiten können nur von angemeldeten Nutzern eingesehen werden.

Authentifizierungsvorgang:
  * Sign up
    * ``First name``: Test
    * ``Last name``: User
    * ``Email``: testuser@test.com
    * ``Password``: password
    * Button `Sign up` klicken
      * Weiterleitung zu Sign in
  * Sign in
    * Info Dialog: `Info! You've successfully signed up. Enjoy the game!`
    * ``Email``: testuser@test.com
    * ``Password``: password
    * Button `Sign in` klicken

## Deployed
Das Spiel wurde mit [Heroku deployed](#example).

Link zum Spiel: https://mensch-aerger-dich-nicht.herokuapp.com/

## Silhouette Seed Template

The Silhouette Seed project is an Activator template which shows how [Silhouette](https://github.com/mohiva/play-silhouette) can be implemented in a Play Framework application. It's a starting point which can be extended to fit your needs.

## Example

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

(The "Build App" phase will take a few minutes)

Or you can find a running example of this template under the following URL: https://play-silhouette-seed.herokuapp.com/

## Features

* Sign Up
* Sign In (Credentials)
* Social Auth (Facebook, Google+, VK, Twitter, Xing, Yahoo)
* Dependency Injection with Guice
* Publishing Events
* Avatar service
* Remember me functionality
* Password reset/change functionality
* Account activation functionality
* Email sending and auth token cleanup
* [Security headers](https://www.playframework.com/documentation/2.4.x/SecurityHeaders)
* [CSRF Protection](https://www.playframework.com/documentation/2.4.x/ScalaCsrf)

## Documentation

Consult the [Silhouette documentation](http://silhouette.mohiva.com/docs) for more information. If you need help with the integration of Silhouette into your project, don't hesitate and ask questions in our [mailing list](https://groups.google.com/forum/#!forum/play-silhouette) or on [Stack Overflow](http://stackoverflow.com/questions/tagged/playframework).

## Activator

See https://typesafe.com/activator/template/play-silhouette-seed

# License

The code is licensed under [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0).
