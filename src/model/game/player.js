import { Hand } from './hand.js'

/**
 * Represents a blackjack player.
 */
export class Player {
  #funds
  #hand

  /**
   * 
   * @param {Hand} hand - The player hand.
   */
  constructor (hand) {
    this.#funds = 50
    this.#hand = hand
  }

  /**
   * Get current player funds.
   *
   * @type {Number}
   */
  get funds () {
    return this.#funds
  }

  addFunds (fundsToAdd) {
    this.#funds += fundsToAdd
  }

  deductFunds (fundsToDeduct) {
    this.#funds -= fundsToDeduct
  }

  addCardToHand (card) {
    this.#hand.addCardToHand(card)
  }

  getHandShallowCopy () {
    return [...this.#hand]
  }
}