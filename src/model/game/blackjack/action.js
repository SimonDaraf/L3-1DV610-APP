/**
 * An enum like class containing actions.
 */
export class Action {
  static HIT = new Action('hit')
  static STAND = new Action('stand')

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
