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
    this.#setSuit(suit)
    this.#setRank(rank)
  }

  #setSuit (suit) {
    if (!(suit instanceof CardSuit)) {
      throw new Error('Invalid card suit.')
    }
    this.#suit = suit
  }

  #setRank (rank) {
    if (!(rank instanceof CardRank)) {
      throw new Error('Invalid card rank.')
    }
    this.#rank = rank
  }

  /**
   * The card suit.
   *
   * @type {CardSuit}
   */
  get suit () {
    return this.#suit
  }

  /**
   * The card rank.
   *
   * @type {CardRank}
   */
  get rank () {
    return this.#rank
  }
}
