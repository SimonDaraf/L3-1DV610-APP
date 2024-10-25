import { Hand } from './hand.js'
import { Deck } from './deck.js'
import { Result } from './result.js'
import { Card } from './card.js'

/**
 * Responsible for the black jack game logic.
 */
export class BlackJack {
  #deck
  #STARTING_HAND_SIZE = 2
  #BLACKJACK = 21

  /**
   * Constructs an instance of a black jack game.
   *
   * @param {Deck} deck - The deck to use.
   */
  constructor (deck) {
    this.#deck = deck
  }

  /**
   * The starting hand size.
   *
   * @type {Number}
   */
  get startingHandSize () {
    return this.#STARTING_HAND_SIZE
  }

  /**
   * Shuffles the deck.
   */
  shuffle () {
    this.#deck.shuffle()
  }

  /**
   * Returns a set of cards to the deck.
   *
   * @param {Card} cards - The cards to return.
   */
  returnCards (cards) {
    this.#deck.addCardsToDeck(cards)
  }

  /**
   * Deals the top card of the deck.
   *
   * @returns {Card} - The top card.
   */
  dealCard () {
    return this.#deck.popTopCard()
  }

  /**
   * Evaluates the winner.
   *
   * @param {Number} playerHandValue - The player hand value.
   * @param {Number} dealerHandValue - The dealer hand value.
   * @returns {Result} - The result enum.
   */
  evaluateWinner(playerHandValue, dealerHandValue) {
    if (dealerHandValue > this.#BLACKJACK) {
      return Result.PLAYER_WINNER
    }

    if (playerHandValue > dealerHandValue) {
      return Result.PLAYER_WINNER
    } else if (playerHandValue === dealerHandValue) {
      return Result.DRAW
    } else {
      return Result.DEALER_WINNER
    }
  }

  /**
   * Checks if the specified hand is busted.
   *
   * @param {Number} handValue - The hand value to check.
   * @returns {Boolean} - If the hand is busted.
   */
  isHandBusted (handValue) {
    if (handValue > 21) {
      return true
    }
    return false
  }

  /**
   * Checks if the hand is a natural winner.
   *
   * @param {Number} handValue - The hand value to check.
   * @returns {Boolean} - If the hand is a natural winner.
   */
  isHandNaturalWinner (handValue) {
    if (handValue === this.#STARTING_HAND_SIZE && handValue === this.#BLACKJACK) {
      return true
    }
    return false
  }
}
