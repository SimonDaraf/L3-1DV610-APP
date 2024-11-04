import { Hand } from './hand.js'
import { Action } from './action.js'
import { Deck } from '../deck.js'
import { Result } from './result.js'
import { Player } from './player.js'
import { BlackJackRules } from './blackjackRules.js'
import { BlackJackEvent } from './blackjackEvents.js'

/**
 * Responsible for the black jack game logic.
 *
 * @event blackjack::onplayercard - Dispatched when the player recieves a card.
 * @event blackjack::ondealercard - Dispatched when the dealer recieves a card.
 */
export class BlackJack extends EventTarget {
  #player
  #dealer
  #deck
  #rules

  /**
   * Constructs an instance of a black jack game.
   */
  constructor () {
    super()

    this.#player = new Player(new Hand())
    this.#dealer = new Player(new Hand())
    this.#deck = new Deck()
    this.#rules = new BlackJackRules()
  }

  /**
   * Sets up the game.
   */
  startGame () {
    this.#deck.shuffle()
    this.#dealCard(BlackJackEvent.PLAYER_CARD, this.#player)
    this.#dealCard(BlackJackEvent.DEALER_CARD, this.#dealer)
    this.#dealCard(BlackJackEvent.PLAYER_CARD, this.#player)
  }

  /**
   * Get game results based on current game state.
   *
   * @returns {Result} - The game result.
   */
  getGameResults () {
    return this.#rules.evaluateWinner(this.#player.hand, this.#dealer.hand)
  }

  /**
   * Resets the game state.
   */
  reset () {
    const playerCards = this.#player.emptyHand()
    const dealerCards = this.#dealer.emptyHand()
    this.#deck.addCardsToDeck(playerCards)
    this.#deck.addCardsToDeck(dealerCards)
  }

  /**
   * Takes players action.
   * If the player is busted the method will return false.
   *
   * @param {Action} action - The action to perform.
   * @returns {Boolean} - If the player still can perform an action.
   */
  takePlayerAction (action) {
    if (action == Action.HIT) {
      return this.#onHit(BlackJackEvent.PLAYER_CARD, this.#player)
    } else {
      return false
    }
  }

  /**
   * Lets the dealer perform their turn.
   */
  takeDealerTurn () {
    this.#dealCard(BlackJackEvent.DEALER_CARD, this.#dealer)

    if (this.#rules.isHandNaturalWinner(this.#dealer.hand)) {
      return
    }

    let shouldStop = false
    while (!shouldStop) {
      shouldStop = this.#takeDealerCycle()
    }
  }

  #takeDealerCycle () {
    if (this.#rules.canDealerHit(this.#dealer.hand)) {
      return this.#onHit(BlackJackEvent.DEALER_CARD, this.#dealer)
    }
    return true
  }

  #onHit (event, player) {
    this.#dealCard(event, player)
    return this.#rules.isHandBusted(player.hand)
  }

  #dealCard (event, player) {
    const card = this.#deck.popTopCard()
    player.addCardToHand(card)
    this.#dispatchPlayerCardEvent(event, card)
  }

  #dispatchPlayerCardEvent (event, card) {
    this.dispatchEvent(new CustomEvent(event.event, {
      bubbles: true,
      detail: card
    }))
  }
}
