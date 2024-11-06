/**
 * The dealer controller responsible for handling the dealer view and AI logic.
 */
export class DealerController {
  /**
   * @type {HTMLElement}
   */
  #dealerView

  /**
   * Constructs an instance of the dealer controller.
   *
   * @param {HTMLElement} dealerView - The dealers view element.
   */
  constructor (dealerView) {
    this.#dealerView = dealerView
  }

  /**
   * Add card to player and playerView.
   *
   * @param {HTMLImageElement} cardElement - The cards image element.
   */
  addCard (cardElement) {
    this.#dealerView.appendChild(cardElement)
  }

  /**
   * Empties view.
   */
  emptyView () {
    this.#dealerView.textContent = ''
  }
}
