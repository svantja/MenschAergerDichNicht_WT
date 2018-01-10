package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import play.api.mvc._
import de.htwg.se.menschaergerdichnicht.Game
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState._
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.PlayersChanged
import de.htwg.se.menschaergerdichnicht.model.playerComponent.playerBaseImpl.Players
import de.htwg.se.sudoku.controller.controllerComponent.GridSizeChanged
import play.api.libs.streams.ActorFlow

import scala.swing.Reactor


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
    gameController.newGame("bla")
    Ok(views.html.mensch(gameController))
  }

  def about = Action {
    Ok(views.html.index())
  }

  def playersToJson = Action {
    Ok(gameController.toJson)
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
        out ! (gameController.toJson.toString)
        println(gameController.toJson.toString)
        println("Sent Json to Client "+ msg)
    }
    reactions += {
      case event: PlayersChanged => {
        sendJsonToClient
        println("actiiiiiiion")
      }
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      println(gameController.toJson.toString)
      out ! (gameController.toJson.toString)
    }
  }
}
