import { Hand } from './hand.js'
import { Deck } from './deck.js'
import { Result } from './result.js'
import { Card } from './card.js'

/**
 * Responsible for the black jack game logic.
 */
export class BlackJack {
  #deck
  #STARTING_HAND_SIZE = 2
  #BLACKJACK = 21

  /**
   * Constructs an instance of a black jack game.
   *
   * @param {Deck} deck - The deck to use.
   */
  constructor (deck) {
    this.#deck = deck
  }

  /**
   * Shuffles the deck.
   */
  shuffle () {
    this.#deck.shuffle()
  }

  /**
   * Returns a set of cards to the deck.
   *
   * @param {Card} cards - The cards to return.
   */
  returnCards (cards) {
    this.#deck.addCardsToDeck(cards)
  }

  /**
   * Deal cards to player and dealer.
   *
   * @param {Hand} playerHand - The player hand.
   * @param {Hand} dealerHand - The dealer hand.
   */
  startDealingProcess (playerHand, dealerHand) {
    for (let i = 0; i < this.#STARTING_HAND_SIZE; i++) {
      this.dealCardToHand(playerHand)
      this.dealCardToHand(dealerHand)
    }
  }

  /**
   * Deals a card to a specific hand. Works on mutation.
   *
   * @param {Hand} hand - The hand to modify.
   */
  dealCardToHand (hand) {
    hand.addCardToHand(this.#deck.popTopCard())
  }

  /**
   * Evaluates the winner.
   *
   * @param {Hand} playerHand - The player hand.
   * @param {Hand} dealerHand - The dealer hand.
   * @returns {Result} - The result enum.
   */
  evaluateWinner(playerHand, dealerHand) {
    const playerValue = playerHand.getHandValue()
    const dealerValue = dealerHand.getHandValue()

    if (playerValue > dealerValue) {
      return Result.PLAYER_WINNER
    } else if (playerValue === dealerValue) {
      return Result.DRAW
    } else {
      return Result.DEALER_WINNER
    }
  }

  /**
   * Checks if the specified hand is busted.
   *
   * @param {Hand} hand - The hand to check.
   * @returns {Boolean} - If the hand is busted.
   */
  isHandBusted (hand) {
    if (hand.getHandValue() > 21) {
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
