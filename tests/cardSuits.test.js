import { expect, test } from 'vitest'
import { CardSuit } from '../src/model/game/cardSuits.js'

test('Assert strict usage of cardRanks', () => {
  // Arrange
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  // Assert
  expect(suitHearts).toStrictEqual(CardSuit.HEARTS)
  expect(suitHearts).toBeInstanceOf(CardSuit)
  expect(suitHearts === 'hearts').toBeFalsy()
  expect(suitHearts.value).toStrictEqual('hearts')

  expect(suitDiamonds).toStrictEqual(CardSuit.DIAMONDS)
  expect(suitDiamonds).toBeInstanceOf(CardSuit)
  expect(suitDiamonds === 'diamonds').toBeFalsy()
  expect(suitDiamonds.value).toStrictEqual('diamonds')

  expect(suitClubs).toStrictEqual(CardSuit.CLUBS)
  expect(suitClubs).toBeInstanceOf(CardSuit)
  expect(suitClubs === 'clubs').toBeFalsy()
  expect(suitClubs.value).toStrictEqual('clubs')

  expect(suitSpades).toStrictEqual(CardSuit.SPADES)
  expect(suitSpades).toBeInstanceOf(CardSuit)
  expect(suitSpades === 'spades').toBeFalsy()
  expect(suitSpades.value).toStrictEqual('spades')
})
