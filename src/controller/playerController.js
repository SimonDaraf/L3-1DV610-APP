import { Result } from '../model/game/result.js'

/**
 * The player controller responsible for handling the player view.
 */
export class PlayerController {
  #playerView
  #fundsView

  #funds
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
    this.#funds = 50
    this.#currentBet = 0
    this.#updatePlayerFundsView(this.#funds)
  }

  /**
   * Add card to player and playerView.
   *
   * @param {HTMLImageElement} cardElement - The cards image element.
   */
  addCard (cardElement) {
    this.#playerView.appendChild(cardElement)
  }

  /**
   * Tries to place a bet.
   *
   * @throws {Error} - If not enough funds to place bet.
   * @param {Number} bet - The bet to place.
   */
  tryPlaceBet (bet) {
    if (bet > this.#funds) {
      throw new Error('Not enough funds.')
    }
    this.#currentBet = bet
    this.#deductFunds(this.#currentBet)
    this.#updatePlayerFundsView(this.#funds)
  }

  /**
   * Checks if the games is over.
   *
   * @returns {Boolean} - Whether the game is over.
   */
  isGameOver () {
    return this.#funds <= 0
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
      this.#addFunds(this.#currentBet * this.#WIN_FACTOR)
      this.#updatePlayerFundsView(this.#funds)
    } else if (result === Result.BLACKJACK) {
      this.#addFunds(this.#currentBet * this.#BLACK_JACK_WIN_FACTOR)
      this.#updatePlayerFundsView(this.#funds)
    } else {
      this.#addFunds(this.#currentBet)
      this.#updatePlayerFundsView(this.#funds)
    }
  }

  /**
   * Empties view.
   */
  emptyView () {
    this.#playerView.textContent = ''
  }

  #updatePlayerFundsView (funds) {
    this.#fundsView.textContent = funds
  }

  #deductFunds (currentBet) {
    this.#funds -= currentBet
  }

  #addFunds (currentBet) {
    this.#funds += currentBet
  }
}
