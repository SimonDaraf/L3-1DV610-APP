import { expect, test } from 'vitest'
import { CardRank } from '../src/model/game/cardRanks.js'

test('Assert strict comparison of ranks', () => {
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankAce = CardRank.ACE

  expect(rankTwo === CardRank.TWO).toBeTruthy()
  expect(rankFive === CardRank.FIVE).toBeTruthy()
  expect(rankQueen === CardRank.QUEEN).toBeTruthy()
  expect(rankAce === CardRank.ACE).toBeTruthy()
})

test('Assert instanceof ranks', () => {
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankAce = CardRank.ACE

  expect(rankTwo).toBeInstanceOf(CardRank)
  expect(rankFive).toBeInstanceOf(CardRank)
  expect(rankQueen).toBeInstanceOf(CardRank)
  expect(rankAce).toBeInstanceOf(CardRank)
})

test('Assert no incorrect usage of ranks', () => {
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankAce = CardRank.ACE

  expect(rankTwo === 2).toBeFalsy()
  expect(rankFive === 5).toBeFalsy()
  expect(rankQueen === 10).toBeFalsy()
  expect(rankAce === 11).toBeFalsy()
})

test('Assert correct usage of ranks', () => {
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankAce = CardRank.ACE

  expect(rankTwo.value).toStrictEqual(2)
  expect(rankFive.value).toStrictEqual(5)
  expect(rankQueen.value).toStrictEqual(10)
  expect(rankAce.value).toStrictEqual(11)
})
