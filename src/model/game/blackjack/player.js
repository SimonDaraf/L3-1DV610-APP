import { Card } from '../card.js'
import { Hand } from './hand.js'

/**
 * Represents a blackjack player.
 */
export class Player {
  #hand

  /**
   *
   * @param {Hand} hand - The player hand.
   */
  constructor (hand) {
    this.#hand = hand
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
