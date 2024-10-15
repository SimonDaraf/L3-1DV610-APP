import { Card } from './card.js'
import { CardSuit } from './cardSuits.js'
import { CardRank } from './cardRanks.js'

/**
 * Represents a deck of playing cards.
 */
export class Deck {
  /**
   * An array of playing cards.
   *
   * @type {Card[]}
   */
  #playingCards
  
  /**
   * Constructs a classic french suited deck with 52 playing cards.
   */
  constructor () {
    this.#playingCards = []
    this.#appendCardsToDeck()
  }

  #appendCardsToDeck () {
    for (const suit of Object.values(CardSuit)) {
      for (const rank of Object.values(CardRank)) {
        this.#playingCards.push(new Card(suit, rank))
      }
    }
  }

  /**
   * Shuffles the deck with the fisher-yates algorithm.
   */
  shuffle () {
    for (let i = this.#playingCards.length - 1; i > 0; i--) {
      // Random index from [0 -> playing cards length - 1]
      const randomIndex = Math.floor(Math.random() * this.#playingCards.length)
      this.#playingCards[randomIndex], this.#playingCards[i] = this.#playingCards[i], this.#playingCards[randomIndex]
    }
  }

  /**
   * Adds each card in the given array to the deck.
   *
   * @param {Card[]} cardsToAdd - The cards to add to the deck.
   */
  addCardsToDeck (cardsToAdd) {
    for (const card of cardsToAdd) {
      this.#playingCards.push(card)
    }
  }

  /**
   * Pops the top card of the deck.
   *
   * @returns {Card} - The top playing card.
   */
  popTopCard () {
    return this.#playingCards.pop()
  }
}