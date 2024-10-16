import { expect, test } from 'vitest'
import { CardRank } from '../src/model/game/cardRanks.js'

test('Assert strict usage of cardRanks', () => {
  // Arrange
  const rankTwo = CardRank.TWO
  const rankFive = CardRank.FIVE
  const rankQueen = CardRank.QUEEN
  const rankACE = CardRank.ACE

  // Assert
  expect(rankTwo).toStrictEqual(CardRank.TWO)
  expect(rankTwo).toBeInstanceOf(CardRank)
  expect(rankTwo === 2).toBeFalsy()
  expect(rankTwo.value).toStrictEqual(2)

  expect(rankFive).toStrictEqual(CardRank.FIVE)
  expect(rankFive).toBeInstanceOf(CardRank)
  expect(rankFive === 5).toBeFalsy()
  expect(rankFive.value).toStrictEqual(5)

  expect(rankQueen).toStrictEqual(CardRank.QUEEN)
  expect(rankQueen).toBeInstanceOf(CardRank)
  expect(rankQueen === 10).toBeFalsy()
  expect(rankQueen.value).toStrictEqual(10)

  expect(rankACE).toStrictEqual(CardRank.ACE)
  expect(rankACE).toBeInstanceOf(CardRank)
  expect(rankACE === 11).toBeFalsy()
  expect(rankACE.value).toStrictEqual(11)
})
