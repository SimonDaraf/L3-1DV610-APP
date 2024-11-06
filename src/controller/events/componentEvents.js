/**
 * An enum like class containing custom component events.
 */
export class ComponentEvent {
  static START = new ComponentEvent('mainmenu::start')
  static MAIN = new ComponentEvent('mainmenu::main')
  static TRY_AGAIN = new ComponentEvent('mainmenu::tryagain')
  static PLAYER_BET = new ComponentEvent('player::bet')
  static PLAYER_HIT = new ComponentEvent('player::hit')
  static PLAYER_STAND = new ComponentEvent('player::stand')
  static DEALER_HIT = new ComponentEvent('dealer::hit')
  static DEALER_STAND = new ComponentEvent('dealer::stand')
  static GAME_OVER = new ComponentEvent('game::gameover')

  /**
   * @type {string}
   */
  #event

  constructor (event) {
    this.#event = event
  }

  /**
   * The underlying event name.
   *
   * @type {string}
   */
  get event () {
    return this.#event
  }
}
