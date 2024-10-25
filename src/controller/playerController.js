import { Player } from '../model/game/player.js'
import { Hand } from '../model/game/hand.js'
import { Result } from '../model/game/result.js'

/**
 * The player controller responsible for handling the player view.
 */
export class PlayerController {
  #playerView
  #fundsView
  #player
  #currentBet
  #WIN_FACTOR = 2
  #BLACK_JACK_WIN_FACTOR = 2.5

  /**
   * Constructs an instance of the player controller.
   *
   * @param {HTMLElement} fundsView - The funds view.
   * @param {HTMLElement} playerView - The player view.
   */
  constructor (playerView, fundsView) {
    this.#playerView = playerView
    this.#fundsView = fundsView
    this.#player = new Player(new Hand())
    this.#currentBet = 0
    this.#updatePlayerFundsView(this.#player.funds)
  }

  #updatePlayerFundsView (funds) {
    this.#fundsView.textContent = funds
  }

  /**
   * Add card to player and playerView.
   *
   * @param {Card} card - The card to add.
   * @param {HTMLImageElement} cardElement - The cards image element.
   */
  addCard (card, cardElement) {
    this.#player.addCardToHand(card)
    this.#playerView.appendChild(cardElement)
  }

  tryPlaceBet (bet) {
    if (bet > this.#player.funds) {
      throw new Error('Not enough funds.')
    }
    this.#currentBet = bet
    this.#player.deductFunds(this.#currentBet)
    this.#updatePlayerFundsView(this.#player.funds)
  }

  /**
   * Get the player hand.
   *
   * @returns {Hand} - The player hand.
   */
  getHand () {
    return this.#player.hand
  }

  /**
   * Updates the players funds based on the game result.
   *
   * @param {Result} result - The game result.
   */
  updateFundsBasedOnResult (result) {
    if (result === Result.DEALER_WINNER) {
      this.#currentBet = 0
    } else if (result === Result.PLAYER_WINNER) {
      this.#player.addFunds(this.#currentBet * this.#WIN_FACTOR)
      this.#updatePlayerFundsView(this.#player.funds)
    } else if (result === Result.BLACKJACK) {
      this.#player.addFunds(this.#currentBet * this.#BLACK_JACK_WIN_FACTOR)
      this.#updatePlayerFundsView(this.#player.funds)
    } else {
      this.#player.addFunds(this.#currentBet)
      this.#updatePlayerFundsView(this.#player.funds)
    }
  }

  /**
   * Checks if the games is over.
   *
   * @returns {Boolean} - Whether the game is over.
   */
  isGameOver () {
    return this.#player.funds <= 0
  }

  /**
   * Empties hand, view and returns cards in hand.
   */
  emptyHandAndView () {
    this.#playerView.textContent = ''
    return this.#player.emptyHand()
  }
}
