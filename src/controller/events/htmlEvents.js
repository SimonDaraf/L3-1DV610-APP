/**
 * An enum like class containing classic html events.
 */
export class HtmlEvent {
  static CLICK = new HtmlEvent('click')

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
