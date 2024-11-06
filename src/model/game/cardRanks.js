/**
 * An enum like class containing card ranks.
 */
export class CardRank {
  static TWO = new CardRank(2, '2')
  static THREE = new CardRank(3, '3')
  static FOUR = new CardRank(4, '4')
  static FIVE = new CardRank(5, '5')
  static SIX = new CardRank(6, '6')
  static SEVEN = new CardRank(7, '7')
  static EIGHT = new CardRank(8, '8')
  static NINE = new CardRank(9, '9')
  static TEN = new CardRank(10, '10')
  static JACK = new CardRank(10, 'jack')
  static QUEEN = new CardRank(10, 'queen')
  static KING = new CardRank(10, 'king')
  static ACE = new CardRank(11, 'ace')

  /**
   * @type {number}
   */
  #value

  /**
   * @type {string}
   */
  #name

  constructor (value, name) {
    this.#value = value
    this.#name = name
  }

  /**
   * The card rank value.
   *
   * @type {number}
   */
  get value () {
    return this.#value
  }

  /**
   * The readable name for the rank.
   *
   * @type {string}
   */
  get name () {
    return this.#name
  }
}
