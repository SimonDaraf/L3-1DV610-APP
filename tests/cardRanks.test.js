import { expect, test } from 'vitest'
import { CardRank } from '../src/model/game/cardRanks.js'

test('Assert strict usage of cardRanks', () => {
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankAce = CardRank.ACE

  expect(rankTwo === CardRank.TWO).toBeTruthy()
  expect(rankTwo).toBeInstanceOf(CardRank)
  expect(rankTwo === 2).toBeFalsy()
  expect(rankTwo.value).toStrictEqual(2)

  expect(rankFive === CardRank.FIVE).toBeTruthy()
  expect(rankFive).toBeInstanceOf(CardRank)
  expect(rankFive === 5).toBeFalsy()
  expect(rankFive.value).toStrictEqual(5)

  expect(rankQueen === CardRank.QUEEN).toBeTruthy()
  expect(rankQueen).toBeInstanceOf(CardRank)
  expect(rankQueen === 10).toBeFalsy()
  expect(rankQueen.value).toStrictEqual(10)

  expect(rankAce === CardRank.ACE).toBeTruthy()
  expect(rankAce).toBeInstanceOf(CardRank)
  expect(rankAce === 11).toBeFalsy()
  expect(rankAce.value).toStrictEqual(11)
})
