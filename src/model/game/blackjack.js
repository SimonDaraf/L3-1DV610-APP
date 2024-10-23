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
   * @param {Deck} deck - The deck to use.
   */
  constructor (playerHand, dealerHand, deck) {
    this.#dealerHand = dealerHand
    this.#playerHand = playerHand
    this.#deck = deck
  }

  /**
   * Shuffle deck and deal cards to player and dealer.
   */
  startDealingProcess () {
    this.#dealCardToHand(this.#playerHand)
  }

  /**
   * Deals a card to a specific hand. Works on mutation.
   *
   * @param {Hand} hand - The hand to modify.
   */
  #dealCardToHand(hand) {
    hand.addCardToHand(this.#deck.popTopCard())
  }
}
