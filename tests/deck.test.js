import { expect, test } from 'vitest'
import { Deck } from '../src/model/game/deck.js'
import { Card } from '../src/model/game/card.js'
import { CardSuit } from '../src/model/game/cardSuits.js'
import { CardRank } from '../src/model/game/cardRanks.js'

test('Assert deck creation', () => {
  // Arrange
  const cleanDeck = []
  const deck = new Deck()

  // Act
  for (const suit of Object.values(CardSuit)) {
    for (const rank of Object.values(CardRank)) {
      cleanDeck.push(new Card(suit, rank))
    }
  }

  // Assert
  for (let i = cleanDeck.length - 1; i >= 0; i--) {
    const poppedCard = deck.popTopCard()
    expect(poppedCard.rank).toEqual(cleanDeck[i].rank)
  }
})
