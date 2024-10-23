import { assert, expect, test } from 'vitest'
import { BlackJack } from '../src/model/game/blackjack.js'
import { Deck } from '../src/model/game/deck.js'
import { Hand } from '../src/model/game/hand.js'

test('Assert cards are dealt to player and dealer', () => {
  // Arrange
  const deck = new Deck()
  const blackJack = new BlackJack(deck)
  const playerHand = new Hand()
  const dealerHand = new Hand()

  // Don't shuffle, this way we know what cards will be at the top of the deck.
  const expectedPlayerHandValue = 21
  const expectedDealerHandValue = 20

  // Act
  blackJack.startDealingProcess(playerHand, dealerHand)

  // Assert
  expect(expectedPlayerHandValue).toStrictEqual(playerHand.getHandValue())
  expect(expectedDealerHandValue).toStrictEqual(dealerHand.getHandValue())
})
