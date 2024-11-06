import { Card } from '../card.js'
import { CardRank } from '../cardRanks.js'

/**
 * Represents a playing hand.
 */
export class Hand {
  /**
   * @type {Card[]}
   */
  #cardsInHand

  /**
   * @type {number}
   */
  #MAX_ALLOWED_VALUE = 21

  /**
   * Constructs a blackjack hand.
   */
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
   * @returns {number} - The hands current value.
   */
  getHandValue () {
    let value = 0

    for (const card of this.#cardsInHand) {
      value += card.rank.value
    }

    if (value > this.#MAX_ALLOWED_VALUE) {
      value -= this.#accountForAces(value)
    }

    return value
  }

  /**
   * The current size of the hand.
   *
   * @returns {number} - The current hand size.
   */
  getCurrentHandSize () {
    return this.#cardsInHand.length
  }

  /**
   * Empties the hand and returns the cards.
   *
   * @returns {Card[]} - The cards in hand.
   */
  emptyHand () {
    const cards = this.#cardsInHand
    this.#cardsInHand = []
    return cards
  }

  #acesInHand () {
    let numberOfAces = 0
    for (const card of this.#cardsInHand) {
      if (card.rank === CardRank.ACE) {
        numberOfAces++
      }
    }
    return numberOfAces
  }

  #accountForAces (value) {
    const acesInHand = this.#acesInHand()
    let deduction = 0
    for (let i = 0; i < acesInHand; i++) {
      // No nicer way to do this, an ace is either 1 or 11, so increment 10
      deduction += 10

      // Check if we need to continue
      if (value < this.#MAX_ALLOWED_VALUE) {
        break
      }
    }

    return deduction
  }
}
