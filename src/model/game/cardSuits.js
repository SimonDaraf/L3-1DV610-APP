/**
 * An enum like class containing card suits.
 */
export class CardSuit {
  static HEARTS = new CardSuit('hearts')
  static DIAMONDS = new CardSuit('diamonds')
  static CLUBS = new CardSuit('clubs')
  static SPADES = new CardSuit('spades')

  /**
   * @type {string}
   */
  #value

  constructor (value) {
    this.#value = value
  }

  /**
   * The card suit value.
   *
   * @type {string}
   */
  get value () {
    return this.#value
  }
}
