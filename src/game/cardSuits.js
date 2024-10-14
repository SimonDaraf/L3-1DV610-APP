/**
 * An enum like class containing card suits.
 */
export class CardSuit {
  static HEARTS = new CardSuit('hearts')
  static DIAMONDS = new CardSuit('diamonds')
  static CLUBS = new CardSuit('clubs')
  static SPADES = new CardSuit('spades')

  constructor(value) {
    this.value = value
  }
}