import { Hand } from './hand.js'
import { Deck } from './deck.js'

/**
 * Responsible for the black jack game logic.
 */
export class BlackJack {
  #deck
  #STARTING_HAND_SIZE = 2

  /**
   * Constructs an instance of a black jack game.
   *
   * @param {Deck} deck - The deck to use.
   */
  constructor (deck) {
    this.#deck = deck
  }

  /**
   * Shuffles the deck.
   */
  shuffle () {
    this.#deck.shuffle()
  }

  /**
   * Deal cards to player and dealer.
   *
   * @param {Hand} playerHand - The player hand.
   * @param {Hand} dealerHand - The dealer hand.
   */
  startDealingProcess (playerHand, dealerHand) {
    for (let i = 0; i < this.#STARTING_HAND_SIZE; i++) {
      this.#dealCardToHand(playerHand)
      this.#dealCardToHand(dealerHand)
    }
  }

  /**
   * Deals a card to a specific hand. Works on mutation.
   *
   * @param {Hand} hand - The hand to modify.
   */
  #dealCardToHand (hand) {
    hand.addCardToHand(this.#deck.popTopCard())
  }
}
