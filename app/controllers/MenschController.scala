package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.menschaergerdichnicht.Game
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState
import scala.io.StdIn.readLine

class MenschController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {

  val gameController = Game.controller
  def tui = gameController.tui.toHtml

  def mensch = Action {
    Ok(tui)
  }

}
