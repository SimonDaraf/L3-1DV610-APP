import { expect, test } from 'vitest'
import { Hand } from '../src/game/hand.js'
import { Card } from '../src/game/card.js'
import { CardSuit } from '../src/game/cardSuits.js'
import { CardRank } from '../src/game/cardRanks.js'

test('Assert correct hand value', () => {
  // Arrange
  const expectedOne = 10
  const expectedTwo = 22
  const expectedThree = 18
  const expectedFour = 14

  const handOne = new Hand()
  const handTwo = new Hand()
  const handThree = new Hand()
  const handFour = new Hand()

  // Close your eyes, JavaScript can't hurt you :)
  const cardsHandOne = [new Card(CardSuit.HEARTS, CardRank.KING)]
  const cardsHandTwo = [new Card(CardSuit.HEARTS, CardRank.EIGHT), 
                        new Card(CardSuit.HEARTS, CardRank.FOUR), 
                        new Card(CardSuit.HEARTS, CardRank.QUEEN)]
  const cardsHandThree = [new Card(CardSuit.HEARTS, CardRank.KNIGHT), 
                        new Card(CardSuit.HEARTS, CardRank.EIGHT)]
  const cardsHandFour = [new Card(CardSuit.HEARTS, CardRank.KING), 
                        new Card(CardSuit.HEARTS, CardRank.TWO), 
                        new Card(CardSuit.HEARTS, CardRank.ACE), 
                        new Card(CardSuit.HEARTS, CardRank.ACE)]
  
  // Act
  for (const card of cardsHandOne) {
    handOne.addCardToHand(card)
  }
  for (const card of cardsHandTwo) {
    handTwo.addCardToHand(card)
  }
  for (const card of cardsHandThree) {
    handThree.addCardToHand(card)
  }
  for (const card of cardsHandFour) {
    handFour.addCardToHand(card)
  }

  // Assert
  expect(handOne.getHandValue()).toStrictEqual(expectedOne)
  expect(handTwo.getHandValue()).toStrictEqual(expectedTwo)
  expect(handThree.getHandValue()).toStrictEqual(expectedThree)
  expect(handFour.getHandValue()).toStrictEqual(expectedFour)
})