import { Result } from '../model/game/blackjack/result.js'

/**
 * The player controller responsible for handling the player view.
 */
export class PlayerController {
  /**
   * @type {number}
   */
  #WIN_FACTOR = 2

  /**
   * @type {number}
   */
  #BLACK_JACK_WIN_FACTOR = 2.5

  /**
   * @type {HTMLElement}
   */
  #playerView

  /**
   * @type {HTMLElement}
   */
  #fundsView

  /**
   * @type {number}
   */
  #funds

  /**
   * @type {number}
   */
  #currentBet

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
   * @throws {Error} - If not enough funds to place bet || Bet couldn't be parsed as a number.
   * @param {number} bet - The bet to place.
   */
  tryPlaceBet (bet) {
    const parsedBet = this.#validateBet(bet)
    this.#currentBet = parsedBet
    this.#deductFunds(this.#currentBet)
    this.#updatePlayerFundsView(this.#funds)
  }

  /**
   * Checks if the games is over.
   *
   * @returns {boolean} - Whether the game is over.
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
    const winnings = this.#getWinningsAmount(this.#currentBet, result)
    this.#addFunds(winnings)
    this.#updatePlayerFundsView(this.#funds)
  }

  /**
   * Empties view.
   */
  emptyView () {
    this.#playerView.textContent = ''
  }

  #validateBet (bet) {
    const parsedBet = parseInt(bet)

    if (Number.isNaN(parsedBet)) {
      throw new Error('Something went wrong, please try again.')
    }
    if (bet > this.#funds) {
      throw new Error('Not enough funds.')
    }
    return parsedBet
  }

  #getWinningsAmount(currentBet, result) {
    if (result === Result.DEALER_WINNER) {
      return 0
    } else if (result === Result.PLAYER_WINNER) {
      return Math.ceil(currentBet * this.#WIN_FACTOR)
    } else if (result === Result.BLACKJACK) {
      return Math.ceil(this.#currentBet * this.#BLACK_JACK_WIN_FACTOR)
    } else {
      return currentBet
    }
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
