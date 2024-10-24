/**
 * An enum like class containing custom component events.
 */
export class ComponentEvent {
  static START = new ComponentEvent('mainmenu::start')
  static HIT = new ComponentEvent('player::hit')
  static STAND = new ComponentEvent('player::stand')

  #event

  constructor (event) {
    this.#event = event
  }

  /**
   * The underlying event name.
   *
   * @type {String}
   */
  get event () {
    return this.#event
  }
}
