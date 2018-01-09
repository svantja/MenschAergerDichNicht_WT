package controllers

import javax.inject._

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
      SudokuWebSocketActorFactory.create(out)
    }
  }

  object SudokuWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new SudokuWebSocketActor(out))
    }
  }

  class SudokuWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)
    def receive = {
      case msg: String =>
        out ! (gameController.players.toJson.toString)
        println(gameController.players.toJson.toString)
        println("Sent Json to Client "+ msg)
    }
    reactions += {
      case event: PlayersChanged => {
        println("actiiiiiiion")
      }
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      println(gameController.players.toJson.toString)
      out ! (gameController.players.toJson.toString)
    }
  }

}
