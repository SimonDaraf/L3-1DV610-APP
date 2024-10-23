import { expect, test } from 'vitest'
import { BlackJack } from '../src/model/game/blackjack.js'
import { Deck } from '../src/model/game/deck.js'
import { Hand } from '../src/model/game/hand.js'
import { Result } from '../src/model/game/result.js'

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

test('Assert player got blackjack', () => {
  // Arrange
  const deck = new Deck()
  const blackJack = new BlackJack(deck)
  const playerHand = new Hand()
  const dealerHand = new Hand()

  // Act
  blackJack.startDealingProcess(playerHand, dealerHand)

  // Assert
  expect(blackJack.isHandNaturalWinner(playerHand)).toBeTruthy()
})

test('Assert player is winner', () => {
  // Arrange
  const deck = new Deck()
  const blackJack = new BlackJack(deck)
  const playerHand = new Hand()
  const dealerHand = new Hand()
  const expectedResult = Result.PLAYER_WINNER

  // Act
  blackJack.startDealingProcess(playerHand, dealerHand)

  // Assert
  expect(2).toStrictEqual(playerHand.getCurrentHandSize())
  expect(21).toStrictEqual(playerHand.getHandValue())
  expect(expectedResult).toStrictEqual(blackJack.evaluateWinner(playerHand, dealerHand))
})
