import { Hand } from '../model/game/hand.js'
import { Action } from '../model/game/action.js'

/**
 * The dealer controller responsible for handling the dealer view and AI logic.
 */
export class DealerController {
  #dealerView
  #dealerHand

  #HIT_ON = 16

  /**
   * Constructs an instance of the dealer controller.
   */
  constructor (dealerView) {
    this.#dealerView = dealerView
    this.#dealerHand = new Hand()
  }

  /**
   * Add card to dealer and dealerView.
   *
   * @param {Card} card - The card to add.
   * @param {HTMLImageElement} cardElement - The cards image element.
   */
  addCard (card, cardElement) {
    this.#dealerHand.addCardToHand(card)
    this.#dealerView.appendChild(cardElement)
  }

  /**
   * Determines the dealers next move.
   *
   * @returns {Action} - The dealers next action.
   */
  getNextAction () {
    console.log(this.#dealerHand.getHandValue())
    if (this.#dealerHand.getHandValue() <= this.#HIT_ON) {
      console.log('dealer hit')
      return Action.HIT
    } else {
      console.log('dealer stand')
      return Action.STAND
    }
  }

  /**
   * Get the dealer hand value.
   *
   * @returns {Number} - The dealers hand value.
   */
  getHandValue () {
    return this.#dealerHand.getHandValue()
  }
}