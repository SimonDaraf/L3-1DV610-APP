/**
 * An enum like class containing classic html events.
 */
export class HtmlEvent {
  static CLICK = new HtmlEvent('click')

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
