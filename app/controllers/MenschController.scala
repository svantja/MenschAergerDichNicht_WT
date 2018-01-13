package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import com.mohiva.play.silhouette.api.{HandlerResult, Silhouette}
import play.api.mvc._
import de.htwg.se.menschaergerdichnicht.Game
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.GameState._
import de.htwg.se.menschaergerdichnicht.controller.controllerComponent.PlayersChanged
import de.htwg.se.menschaergerdichnicht.model.playerComponent.playerBaseImpl.Players
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import play.api.libs.streams.ActorFlow
import utils.auth.DefaultEnv
import play.api.mvc.Controller

import scala.concurrent.Future
import scala.swing.Reactor

@Singleton
class MenschController @Inject() (
				   components: ControllerComponents,
				   silhouette: Silhouette[DefaultEnv])(implicit webJarsUtil: WebJarsUtil, assets: AssetsFinder, system: ActorSystem, mat:Materializer)extends AbstractController(components) with I18nSupport {

  val gameController = Game.controller

  def tui = gameController.tui


  def mensch = silhouette.SecuredAction { implicit request =>
    Ok(views.html.mensch(gameController ,request.identity))
  }

  def newPlayer(index:Int) = silhouette.SecuredAction { implicit request =>
    gameController.addPlayer(index.toString)
    Ok(views.html.mensch(gameController ,request.identity))
  }

  def start = silhouette.SecuredAction{implicit request =>
    gameController.startGame()
    gameController.gameState = ONGOING
    Ok(views.html.mensch(gameController ,request.identity))
  }


  def dicing= silhouette.SecuredAction{implicit request =>
    gameController.startGame()
    Ok(views.html.mensch(gameController ,request.identity))
  }

  def move(id: Int)= silhouette.SecuredAction{implicit request =>
    gameController.chooseToken(id)
    Ok(views.html.mensch(gameController ,request.identity))
  }

  def newGame= silhouette.SecuredAction{implicit request =>
    gameController.newGame()
    Ok(views.html.mensch(gameController ,request.identity))
  }

  def about= silhouette.UnsecuredAction{implicit request =>
    gameController.newGame()
    Ok(views.html.about("About Mensch Ärger Dich Nicht"))
  }

  def aboutsecure= silhouette.SecuredAction{implicit request =>
    gameController.newGame()
    Ok(views.html.aboutsecure("About Mensch Ärger Dich Nicht", request.identity))
  }

  def homesecure = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(views.html.homesecure("Home Mensch Ärger Dich Nicht", request.identity)))
  }

  def playersToJson= silhouette.SecuredAction{implicit request =>
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

  class MenschWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(gameController)
    def receive = {
      case msg: String =>
        out ! (gameController.toJson.toString)
        println(gameController.toJson.toString)
        println("Sent Json to Client " + msg)
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
