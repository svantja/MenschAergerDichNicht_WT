package controllers

import javax.inject._

import com.sun.media.jfxmedia.events.PlayerStateEvent.PlayerState



@Singleton
class MenschController @Inject() (cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  var game = Game
  var gameController = game.controller
  def tui = gameController.tui

  def mensch = Action {
    Ok(views.html.mensch(gameController))
  }

  def newPlayer(index: Int) = Action {
    gameController.addPlayer(index.toString)
    Ok(views.html.mensch(gameController))
  }

  def start = Action {
    gameController.startGame()
    gameController.gameState = ONGOING
    Ok(views.html.mensch(gameController))
  }

  def dicing = Action {
    gameController.startGame()
    Ok(views.html.mensch(gameController))
  }

  def move(id: Int) = Action {
    gameController.chooseToken(id)
    Ok(views.html.mensch(gameController))
  }

  def newGame = Action {
    gameController.players = new Players
    gameController.gameState = PREPARE
    Ok(views.html.mensch(gameController))
  }

  def about = Action {
    Ok(views.html.index())
  }

  def playerToJson = Action {
    Ok(gameController.players.toJson)
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      MenschWebSocketActorFactory.create(out)
    }
  }

  object MenschWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new MenschWebSocketActor(out))
    }
  }

  class MenschWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)

    def receive = {
      case msg: String =>
        out ! (gameConroller.toJson.toString)
        println("Send Json to Client" + msg)
    }

    reactions += {
      case event: PlayerState => sendJsonToClien
    }

    def sendJsonToClien = {
      println("Received event from Controller")
      out ! (gameController.toJson.toString)
    }
  }

}
