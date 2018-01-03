package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.menschaergerdichnicht.Game
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState
import scala.io.StdIn.readLine
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState

@Singleton
class MenschController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {

  val gameController = Game.controller
  def tui = gameController.tui

  def mensch = Action {
    Ok(views.html.mensch(gameController))
  }

  def newPlayer(index: Int) = Action{
    gameController.addPlayer(index.toString)
    Ok(views.html.mensch(gameController))
  }

  def start = Action{
    gameController.startGame()
    gameController.gameState == "ONGOING"
    Ok(views.html.mensch(gameController))
  }

  def dicing = Action {
    gameController.startGame()
    Ok(views.html.mensch(gameController))
  }

  def move(id: Int) = Action{
    gameController.chooseToken(id)
    Ok(views.html.mensch(gameController))
  }

}
