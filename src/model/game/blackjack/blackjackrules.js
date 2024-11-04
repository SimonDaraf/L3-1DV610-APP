import { Hand } from './hand.js'
import { Result } from './result.js'

/**
 * Contains rules for the blackjack game.
 */
export class BlackJackRules {
  #STARTING_HAND_SIZE = 2
  #BLACKJACK = 21

  /**
   * Evaluates the winner.
   *
   * @param {Hand} playerHand - The player hand.
   * @param {Hand} dealerHand - The dealer hand.
   * @returns {Result} - The result enum.
   */
  evaluateWinner (playerHand, dealerHand) {
    // If player hand is busted, dealer can't be busted so check first.
    if (this.isHandBusted(playerHand.getHandValue())) {
      return Result.DEALER_WINNER
    }
    if (this.isHandBusted(dealerHand.getHandValue())) {
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
   * @param {Number} handValue - The hand value to check.
   * @returns {Boolean} - If the hand is busted.
   */
  isHandBusted (handValue) {
    if (handValue > 21) {
      return true
    }
    return false
  }

  /**
   * Checks if the hand is a natural winner.
   *
   * @param {Hand} hand - The hand to check.
   * @returns {Boolean} - If the hand is a natural winner.
   */
  isHandNaturalWinner (hand) {
    if (hand.getCurrentHandSize() === this.#STARTING_HAND_SIZE && hand.getHandValue() === this.#BLACKJACK) {
      return true
    }
    return false
  }
}
