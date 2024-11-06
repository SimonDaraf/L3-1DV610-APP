/**
 * An enum like class containing blackjack events.
 */
export class BlackJackEvent {
  static PLAYER_CARD = new BlackJackEvent('blackjack::onplayercard')
  static DEALER_CARD = new BlackJackEvent('blackjack::ondealercard')

  /**
   * @type {string}
   */
  #event

  constructor (value) {
    this.#event = value
  }

  /**
   * The event name.
   *
   * @type {string}
   */
  get event () {
    return this.#event
  }
}
