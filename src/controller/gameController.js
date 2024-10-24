/**
 * Controlls the game instance.
 */
export class GameController extends EventTarget {
  #gameComponent

  /**
   * Constructs an instance of the GameController.
   *
   * @param {HTMLElement} element - The game component to listen to.
   */
  constructor (gameComponent) {
    this.#gameComponent = gameComponent
  }
}