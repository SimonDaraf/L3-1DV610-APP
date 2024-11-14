import { Hand } from './hand.js'
import { Result } from './result.js'

/**
 * Contains rules for the blackjack game.
 */
export class BlackJackRules {
  /**
   * @type {number}
   */
  #STARTING_HAND_SIZE = 2

  /**
   * @type {number}
   */
  #BLACKJACK = 21

  /**
   * @type {number}
   */
  #DEALER_HIT_LIMIT = 17

  /**
   * Evaluates the winner.
   *
   * @param {Hand} playerHand - The player hand.
   * @param {Hand} dealerHand - The dealer hand.
   * @returns {Result} - The result enum.
   */
  evaluateWinner (playerHand, dealerHand) {
    // If player hand is busted, dealer can't be busted so check first.
    if (this.isHandBusted(playerHand)) {
      return Result.DEALER_WINNER
    }
    if (this.isHandBusted(dealerHand)) {
      return Result.PLAYER_WINNER
    }

    if (this.isHandNaturalWinner(playerHand) && !this.isHandNaturalWinner(dealerHand)) {
      return Result.BLACKJACK
    }

    if (playerHand.getHandValue() > dealerHand.getHandValue()) {
      return Result.PLAYER_WINNER
    } else if (playerHand.getHandValue() === dealerHand.getHandValue()) {
      return Result.DRAW
    } else {
      return Result.DEALER_WINNER
    }
  }

  /**
   * Checks if the specified hand is busted.
   *
   * @param {Hand} hand - The hand to check.
   * @returns {boolean} - If the hand is busted.
   */
  isHandBusted (hand) {
    return hand.getHandValue() > 21
  }

  /**
   * Checks if the hand is a natural winner.
   *
   * @param {Hand} hand - The hand to check.
   * @returns {boolean} - If the hand is a natural winner.
   */
  isHandNaturalWinner (hand) {
    if (hand.getCurrentHandSize() === this.#STARTING_HAND_SIZE && hand.getHandValue() === this.#BLACKJACK) {
      return true
    }
    return false
  }

  /**
   * Check if dealer can hit.
   *
   * @param {Hand} hand - The hand to check.
   * @returns {boolean} - If the dealer can hit.
   */
  canDealerHit (hand) {
    return hand.getHandValue() < this.#DEALER_HIT_LIMIT
  }
}
