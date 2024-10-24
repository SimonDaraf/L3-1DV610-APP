import { BlackJack } from '../model/game/blackjack.js'
import { Deck } from '../model/game/deck.js'
import { ComponentEvent } from './events/componentEvents.js'

/**
 * Controlls the game instance.
 */
export class GameController extends EventTarget {
  #gameComponent
  #blackJackInstance
  #abortController

  /**
   * Constructs an instance of the GameController.
   *
   * @param {HTMLElement} gameComponent - The game component to listen to.
   */
  constructor (gameComponent) {
    super()
    this.#gameComponent = gameComponent
    this.#blackJackInstance = new BlackJack(new Deck())
    this.#abortController = new AbortController()
    this.#addEventListeners()
  }

  #addEventListeners () {
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_HIT.event, this.#onPlayer_Hit, { signal: this.#abortController.signal })
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_STAND.event, this.#onPlayer_Stand, { signal: this.#abortController.signal })
  }

  #onPlayer_Hit () {
  }

  #onPlayer_Stand () {
  }
}
