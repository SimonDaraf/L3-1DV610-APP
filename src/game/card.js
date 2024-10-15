import { CardSuit } from './cardSuits.js'
import { CardRank } from './cardRanks.js'

/**
 * Represents a basic playing card.
 */
export class Card {
  #suit
  #rank

  /**
   * Constructs an instance of a basic playing card.
   *
   * @param {CardSuit} suit - The card suit.
   * @param {CardRank} rank - The card rank. 
   */
  constructor (suit, rank) {
    this.#suit = suit
    this.#rank = rank
  }

  /**
   * The card suit.
   *
   * @type {CardSuit}
   */
  get suit() {
    return this.#suit
  }

  /**
   * The card rank.
   *
   * @type {CardRank}
   */
  get rank() {
    return this.#rank
  }
}