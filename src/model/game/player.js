import { Card } from './card.js'
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

  /**
   * Get the player hand.
   *
   * @type {Hand}
   */
  get hand () {
    return this.#hand
  }

  /**
   * Adds funds to player.
   *
   * @param {Number} fundsToAdd - The fudns to add.
   */
  addFunds (fundsToAdd) {
    this.#funds += fundsToAdd
  }

  /**
   * Deducts funds from player.
   *
   * @param {Number} fundsToDeduct - The funds to deduct.
   */
  deductFunds (fundsToDeduct) {
    this.#funds -= fundsToDeduct
  }

  /**
   * Adds a card to the hand.
   *
   * @param {Card} card - Card to add.
   */
  addCardToHand (card) {
    this.#hand.addCardToHand(card)
  }

  /**
   * Empties the hand and returns the cards.
   *
   * @returns {Card[]} - The cards emptied.
   */
  emptyHand () {
    return this.#hand.emptyHand()
  }
}