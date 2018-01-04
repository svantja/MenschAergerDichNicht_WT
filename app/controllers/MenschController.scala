package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.menschaergerdichnicht.Game
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState._
import de.htwg.se.menschaergerdichnicht.model.playerComponent.playerBaseImpl.Players


@Singleton
class MenschController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {

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
}
