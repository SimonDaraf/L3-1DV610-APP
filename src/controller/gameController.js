import { BlackJack } from '../model/game/blackjack/blackjack.js'
import { BlackJackEvent } from '../model/game/blackjack/blackjackEvents.js'
import { ComponentEvent } from './events/componentEvents.js'
import { RegisteredComponent } from './registeredComponents.js'
import { PlayerController } from './playerController.js'
import { DealerController } from './dealerController.js'

/**
 * Controlls the game instance.
 */
export class GameController extends EventTarget {
  /**
   * @type {HTMLElement}
   */
  #gameComponent

  /**
   * @type {HTMLElement}
   */
  #choiceView

  /**
   * @type {HTMLElement}
   */
  #betView

  /**
   * @type {HTMLElement}
   */
  #playerChoiceView

  /**
   * @type {AbortController}
   */
  #abortController

  /**
   * @type {BlackJack}
   */
  #blackJackInstance

  /**
   * @type {PlayerController}
   */
  #playerController

  /**
   * @type {PlayerController}
   */
  #dealerController

  /**
   * @type {URL}
   */
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
    this.#blackJackInstance = new BlackJack()
    this.#choiceView = this.#gameComponent.shadowRoot.querySelector('#choice')
    this.#betView = document.createElement(RegisteredComponent.BET_COMPONENT.componentName)
    this.#playerChoiceView = document.createElement(RegisteredComponent.CHOICE_COMPONENT.componentName)
    this.#cardFolderPath = new URL('../view/cards', import.meta.url).toString()

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
    this.#addEvent(this.#betView, ComponentEvent.PLAYER_BET.event, this.#onPlayerBet)
    this.#addEvent(this.#playerChoiceView, ComponentEvent.PLAYER_HIT.event, this.#onPlayerHit)
    this.#addEvent(this.#playerChoiceView, ComponentEvent.PLAYER_STAND.event, this.#onPlayerStand)
    this.#addEvent(this.#blackJackInstance, BlackJackEvent.PLAYER_CARD.event, this.#onBlackJackPlayerCard)
    this.#addEvent(this.#blackJackInstance, BlackJackEvent.DEALER_CARD.event, this.#onBlackJackDealerCard)
  }

  #addEvent (target, eventName, method) {
    target.addEventListener(eventName, method.bind(this), { signal: this.#abortController.signal })
  }

  #startGame () {
    this.#playerController.emptyView()
    this.#dealerController.emptyView()
    this.#blackJackInstance.startGame()
    this.#togglePlayerChoiceView()
  }

  #startDealerTurn () {
    this.#blackJackInstance.takeDealerTurn()
    this.#evaluateGameResult()
  }

  #evaluateGameResult () {
    const result = this.#blackJackInstance.getGameResults()
    this.#playerController.updateFundsBasedOnResult(result)

    if (this.#playerController.isGameOver()) {
      this.#dispatchGameOver()
    } else {
      this.#blackJackInstance.reset()
      this.#changeBetPrompt(result)
      this.#toggleBetView()
    }
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

  #onPlayerBet (eventObj) {
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

  #onPlayerHit () {
    if (!this.#blackJackInstance.playerHit()) {
      this.#togglePlayerChoiceView()
      this.#evaluateGameResult()
    }
  }

  #onPlayerStand () {
    this.#togglePlayerChoiceView()
    this.#startDealerTurn()
  }

  #onBlackJackPlayerCard (eventObj) {
    const card = eventObj.detail
    this.#playerController.addCard(this.#createCardElement(card))
  }

  #onBlackJackDealerCard (eventObj) {
    const card = eventObj.detail
    this.#dealerController.addCard(this.#createCardElement(card))
  }
}
