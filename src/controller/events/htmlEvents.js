/**
 * An enum like class containing classic html events.
 */
export class HtmlEvent {
  static CLICK = new HtmlEvent('click')
  static DOM_CONTENT_LOADED = new HtmlEvent('DOMContentLoaded')

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
