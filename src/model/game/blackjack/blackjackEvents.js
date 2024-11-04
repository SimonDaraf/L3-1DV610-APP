/**
 * An enum like class containing blackjack events.
 */
export class BlackJackEvent {
  static PLAYER_CARD = new PlayerEvent('blackjack::onplayercard')
  static DEALER_CARD = new PlayerEvent('blackjack::ondealercard')

  #value

  constructor (value) {
    this.#value = value
  }

  /**
   * The action value.
   *
   * @type {string}
   */
  get value () {
    return this.#value
  }
}
