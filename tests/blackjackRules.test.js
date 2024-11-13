import { expect, test } from 'vitest'
import { Player } from '../src/model/game/blackjack/player.js'
import { Hand } from '../src/model/game/blackjack/hand.js'
import { BlackJackRules } from '../src/model/game/blackjack/blackjackRules.js'
import { Card } from '../src/model/game/card'
import { CardRank } from '../src/model/game/cardRanks'
import { CardSuit } from '../src/model/game/cardSuits'
import { Result } from '../src/model/game/blackjack/result.js'

test('Assert result is draw | Both blackjack', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.DRAW.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.ACE))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.ACE))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is draw | Both equal', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.DRAW.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is blackjack | Player blackjack', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.BLACKJACK.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TWO))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.ACE))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is dealer win | Player bust', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.DEALER_WINNER.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TWO))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is player win | Dealer bust', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.PLAYER_WINNER.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is player win | Dealer lower', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.PLAYER_WINNER.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.THREE))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})

test('Assert result is dealer win | Player lower', () => {
  const dealer = new Player(new Hand())
  const player = new Player(new Hand())
  const rules = new BlackJackRules()
  const expected = Result.DEALER_WINNER.value

  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  dealer.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.TEN))
  player.addCardToHand(new Card(CardSuit.HEARTS, CardRank.THREE))

  expect(expected).toStrictEqual(rules.evaluateWinner(player.hand, dealer.hand).value)
})
