import { Hand } from './hand.js'
import { Deck } from './deck.js'

/**
 * Responsible for the black jack game logic.
 */
export class BlackJack {
  #dealerHand
  #playerHand
  #deck

  /**
   * Constructs an instance of a black jack game.
   *
   * @param {Hand} dealerHand - the dealer hand.
   * @param {Hand} playerHand - the player hand.
   */
  constructor (playerHand, dealerHand) {
    this.#dealerHand = dealerHand
    this.#playerHand = playerHand
    this.#deck = new Deck()
  }
}
