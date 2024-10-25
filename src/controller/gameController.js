import { BlackJack } from '../model/game/blackjack.js'
import { Deck } from '../model/game/deck.js'
import { Action } from '../model/game/action.js'
import { ComponentEvent } from './events/componentEvents.js'
import { RegisteredComponent } from './registeredComponents.js'
import { PlayerController } from './playerController.js'
import { DealerController } from './dealerController.js'

/**
 * Controlls the game instance.
 */
export class GameController extends EventTarget {
  #gameComponent
  #abortController

  #blackJackInstance
  #playerController
  #dealerController

  #choiceView
  #betView
  #playerChoiceView

  #cardFolderPath

  /**
   * Constructs an instance of the GameController.
   *
   * @param {HTMLElement} gameComponent - The game component to listen to.
   */
  constructor (gameComponent) {
    super()

    this.#gameComponent = gameComponent
    this.#abortController = new AbortController()

    this.#blackJackInstance = new BlackJack(new Deck())

    this.#cardFolderPath = new URL('../view/cards', import.meta.url).toString()

    this.#choiceView = this.#gameComponent.shadowRoot.querySelector('#choice')
    this.#betView = document.createElement(RegisteredComponent.BET_COMPONENT.componentName)
    this.#playerChoiceView = document.createElement(RegisteredComponent.CHOICE_COMPONENT.componentName)

    const playerView = this.#gameComponent.shadowRoot.querySelector('#player-hand')
    const fundsView = this.#gameComponent.shadowRoot.querySelector('#fund-displayer')
    this.#playerController = new PlayerController(playerView, fundsView)

    const dealerView = this.#gameComponent.shadowRoot.querySelector('#dealer-hand')
    this.#dealerController = new DealerController(dealerView)

    this.#choiceView.appendChild(this.#betView)
    this.#choiceView.appendChild(this.#playerChoiceView)
    this.#togglePlayerChoiceView()

    this.#addEventListeners()
  }

  /**
   * Aborts attached listeners.
   */
  abortListeners () {
    this.#abortController.abort()
  }

  #addEventListeners () {
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_HIT.event, this.#onPlayer_Hit.bind(this), { signal: this.#abortController.signal })
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_STAND.event, this.#onPlayer_Stand.bind(this), { signal: this.#abortController.signal })
    this.#betView.addEventListener(ComponentEvent.PLAYER_BET.event, this.#onPlayer_Bet.bind(this), { signal: this.#abortController.signal })
    this.#playerChoiceView.addEventListener(ComponentEvent.PLAYER_HIT.event, this.#onPlayer_Hit.bind(this), { signal: this.#abortController.signal })
    this.#playerChoiceView.addEventListener(ComponentEvent.PLAYER_STAND.event, this.#onPlayer_Stand.bind(this), { signal: this.#abortController.signal })
  }

  #startGame () {
    this.#cleanUpRound()
    this.#blackJackInstance.shuffle()
    const startingHandSize = this.#blackJackInstance.startingHandSize

    for (let i = 0; i < startingHandSize; i++) {
      this.#dealCardToPlayer()
      // Do not deal two cards to dealer at the start.
      if (i < startingHandSize - 1) {
        this.#dealCardToDealer()
      }
    }

    if (this.#blackJackInstance.isHandNaturalWinner(this.#playerController.getHand())) {
      this.#evaluateResults()
      return
    }

    this.#togglePlayerChoiceView()
  }

  #cleanUpRound () {
    const playerCards = this.#playerController.emptyHandAndView()
    const dealerCards = this.#dealerController.emptyHandAndView()

    const cards = playerCards.concat(dealerCards) // Join the arrays.
    this.#blackJackInstance.returnCards(cards)
  }

  #isGameOver () {
    if (this.#playerController.isGameOver()) {
      return true
    }
    return false
  }

  #takeDealerTurn () {
    let continueTurn = true
    while (continueTurn) {
      continueTurn = this.#dealerTurnCycle()
    }
    this.#evaluateResults()
  }

  #dealerTurnCycle () {
    const action = this.#dealerController.getNextAction()

    if (action === Action.HIT) {
      this.#dealCardToDealer()
    } else {
      return false
    }

    if (this.#isHandBusted(this.#dealerController.getHand().getHandValue())) {
      return false
    }
    return true
  }

  #evaluateResults () {
    const result = this.#blackJackInstance.evaluateWinner(this.#playerController.getHand(), this.#dealerController.getHand())
    this.#playerController.updateFundsBasedOnResult(result)

    if (this.#isGameOver()) {
      this.#dispatchGameOver()
      return
    }

    this.#toggleBetView()
    this.#changeBetPrompt(result)
  }

  #isHandBusted (handValue) {
    return this.#blackJackInstance.isHandBusted(handValue)
  }

  #dealCardToPlayer () {
    const card = this.#blackJackInstance.dealCard()
    this.#playerController.addCard(card, this.#createCardElement(card))
  }

  #dealCardToDealer () {
    const card = this.#blackJackInstance.dealCard()
    this.#dealerController.addCard(card, this.#createCardElement(card))
  }

  #createCardElement (card) {
    const cardComponent = document.createElement(RegisteredComponent.CARD_COMPONENT.componentName)
    const img = document.createElement('img')
    img.setAttribute('slot', 'card-face')
    img.src = `${this.#cardFolderPath}/${card.fileName}`
    cardComponent.appendChild(img)
    return cardComponent
  }

  #toggleBetView () {
    if (this.#betView.style.display !== 'none') {
      this.#betView.style.display = 'none'
    } else {
      this.#betView.style.display = 'block'
    }
  }

  #changeBetPrompt (result) {
    const promptElement = this.#betView.shadowRoot.querySelector('#bet-header')
    promptElement.textContent = result.value
  }

  #togglePlayerChoiceView () {
    if (this.#playerChoiceView.style.display !== 'none') {
      this.#playerChoiceView.style.display = 'none'
    } else {
      this.#playerChoiceView.style.display = 'block'
    }
  }

  #dispatchGameOver () {
    this.dispatchEvent(new CustomEvent(ComponentEvent.GAME_OVER.event, {
      bubbles: true
    }))
  }

  #onPlayer_Bet (eventObj) {
    const bet = eventObj.detail
    try {
      this.#playerController.tryPlaceBet(bet)
    } catch (error) {
      window.alert('Not enough funds!')
      return
    }

    this.#toggleBetView()
    this.#startGame()
  }

  #onPlayer_Hit () {
    this.#dealCardToPlayer()
    if (this.#isHandBusted(this.#playerController.getHand().getHandValue())) {
      this.#togglePlayerChoiceView()
      this.#evaluateResults()
    }
  }

  #onPlayer_Stand () {
    this.#togglePlayerChoiceView()
    this.#takeDealerTurn()
  }
}
