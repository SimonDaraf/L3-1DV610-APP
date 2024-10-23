/**
 * An enum like class containing game results.
 */
export class Result {
  static PLAYER_WINNER = new Result('You Win')
  static DEALER_WINNER = new Result('Dealer Win')
  static DRAW = new Result('Draw')

  #value

  constructor (value) {
    this.#value = value
  }

  /**
   * The result value.
   *
   * @type {string}
   */
  get value () {
    return this.#value
  }
}
