import { expect, test } from 'vitest'
import { CardSuit } from '../src/model/game/cardSuits.js'

test('Assert strict comparison of suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts === CardSuit.HEARTS).toBeTruthy()
  expect(suitDiamonds === CardSuit.DIAMONDS).toBeTruthy()
  expect(suitClubs === CardSuit.CLUBS).toBeTruthy()
  expect(suitSpades === CardSuit.SPADES).toBeTruthy()
})

test('Assert instanceof suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts).toBeInstanceOf(CardSuit)
  expect(suitDiamonds).toBeInstanceOf(CardSuit)
  expect(suitClubs).toBeInstanceOf(CardSuit)
  expect(suitSpades).toBeInstanceOf(CardSuit)
})

test('Assert no incorrect usage of suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts === 'hearts').toBeFalsy()
  expect(suitDiamonds === 'diamonds').toBeFalsy()
  expect(suitClubs === 'clubs').toBeFalsy()
  expect(suitSpades === 'spades').toBeFalsy()
})

test('Assert correct usage of suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts.value).toStrictEqual('hearts')
  expect(suitDiamonds.value).toStrictEqual('diamonds')
  expect(suitClubs.value).toStrictEqual('clubs')
  expect(suitSpades.value).toStrictEqual('spades')
})
