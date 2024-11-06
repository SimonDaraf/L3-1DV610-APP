import { expect, test } from 'vitest'
import { CardSuit } from '../src/model/game/cardSuits.js'

test('Assert strict usage of cardRanks', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts === CardSuit.HEARTS).toBeTruthy()
  expect(suitHearts).toBeInstanceOf(CardSuit)
  expect(suitHearts === 'hearts').toBeFalsy()
  expect(suitHearts.value).toStrictEqual('hearts')

  expect(suitDiamonds === CardSuit.DIAMONDS).toBeTruthy()
  expect(suitDiamonds).toBeInstanceOf(CardSuit)
  expect(suitDiamonds === 'diamonds').toBeFalsy()
  expect(suitDiamonds.value).toStrictEqual('diamonds')

  expect(suitClubs === CardSuit.CLUBS).toBeTruthy()
  expect(suitClubs).toBeInstanceOf(CardSuit)
  expect(suitClubs === 'clubs').toBeFalsy()
  expect(suitClubs.value).toStrictEqual('clubs')

  expect(suitSpades === CardSuit.SPADES).toBeTruthy()
  expect(suitSpades).toBeInstanceOf(CardSuit)
  expect(suitSpades === 'spades').toBeFalsy()
  expect(suitSpades.value).toStrictEqual('spades')
})
