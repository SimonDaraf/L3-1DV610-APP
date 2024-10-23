/**
 * An enum like class containing card ranks.
 */
export class CardRank {
  static TWO = new CardRank(2)
  static THREE = new CardRank(3)
  static FOUR = new CardRank(4)
  static FIVE = new CardRank(5)
  static SIX = new CardRank(6)
  static SEVEN = new CardRank(7)
  static EIGHT = new CardRank(8)
  static NINE = new CardRank(9)
  static TEN = new CardRank(10)
  static JACK = new CardRank(10)
  static QUEEN = new CardRank(10)
  static KING = new CardRank(10)
  static ACE = new CardRank(11)

  #value

  constructor (value) {
    this.#value = value
  }

  /**
   * The card rank value.
   *
   * @type {number}
   */
  get value () {
    return this.#value
  }
}
