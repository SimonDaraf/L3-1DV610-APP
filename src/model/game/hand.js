import { Card } from './card.js'
import { CardRank } from './cardRanks.js'

/**
 * Represents a playing hand.
 */
export class Hand {
  /**
   * Current cards in hand.
   *
   * @type {Card[]}
   */
  #cardsInHand

  /**
   * The max allowed value of a hand.
   */
  #MAX_ALLOWED_VALUE = 21

  constructor () {
    this.#cardsInHand = []
  }

  /**
   * Returns a shallow copy of cards.
   *
   * @returns {Card[]} - The shallow card array copy.
   */
  getCopyOfCards () {
    return [...this.#cardsInHand]
  }

  /**
   * Add a playing card to the hand.
   *
   * @param {Card} card
   */
  addCardToHand (card) {
    this.#cardsInHand.push(card)
  }

  /**
   * Returns the current hand value as a whole number.
   *
   * @returns {Number} - The hands current value.
   */
  getHandValue () {
    let value = 0

    // Separate this from hand??
    for (const card of this.#cardsInHand) {
      value += card.rank.value
    }

    if (value > this.#MAX_ALLOWED_VALUE) {
      for (let i = 0; i < this.#acesInHand(); i++) {
        // No nicer way to do this, an ace is either 1 or 11, so remove 10.
        value -= 10

        // Check if we need to continue
        if (value < this.#MAX_ALLOWED_VALUE) {
          break
        }
      }
    }

    return value
  }

  /**
   * The current size of the hand.
   *
   * @returns {Number} - The current hand size.
   */
  getCurrentHandSize () {
    return this.#cardsInHand.length
  }

  /**
   * Returns the amount of aces in hand.
   *
   * @returns {Number} - The amount of aces in hand.
   */
  #acesInHand () {
    let numberOfAces = 0
    for (const card of this.#cardsInHand) {
      if (card.rank === CardRank.ACE) {
        numberOfAces++
      }
    }
    return numberOfAces
  }
}
