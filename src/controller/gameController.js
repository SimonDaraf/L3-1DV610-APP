import { BlackJack } from '../model/game/blackjack.js'
import { Deck } from '../model/game/deck.js'
import { Hand } from '../model/game/hand.js'
import { Card } from '../model/game/card.js'
import { Player } from '../model/game/player.js'
import { ComponentEvent } from './events/componentEvents.js'
import { RegisteredComponent } from './registeredComponents.js'

/**
 * Controlls the game instance.
 */
export class GameController extends EventTarget {
  #gameComponent
  #abortController

  #blackJackInstance
  #dealerHand
  #player
  #currentBet

  #playerView
  #dealerView
  #choiceView
  #betView
  #fundsView

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
    this.#dealerHand = new Hand()
    this.#player = new Player(new Hand())
    this.#currentBet = 0

    this.#cardFolderPath = new URL('../view/cards', import.meta.url).toString()

    // Add view to edit.
    this.#playerView = this.#gameComponent.shadowRoot.querySelector('#player-hand')
    this.#dealerView = this.#gameComponent.shadowRoot.querySelector('#dealer-hand')
    this.#choiceView = this.#gameComponent.shadowRoot.querySelector('#choice')
    this.#fundsView = this.#gameComponent.shadowRoot.querySelector('#fund-displayer')

    // Append bet view to start.
    this.#betView = document.createElement(RegisteredComponent.BET_COMPONENT.componentName)
    this.#choiceView.appendChild(this.#betView)

    this.#updatePlayerFundsView(this.#player.funds)
  
    this.#addEventListeners()
  }

  #startGame () {
    this.#blackJackInstance.shuffle()
    this.#blackJackInstance.startDealingProcess(this.#player.hand, this.#dealerHand)

    for (const card of this.#player.hand.getCopyOfCards()) {
      this.#renderCardForPlayer(card)
    }

    for (const card of this.#dealerHand.getCopyOfCards()) {
      this.#renderCardForDealer(card)
    }
  }

  #renderCardForPlayer (card) {
    const cardComponent = document.createElement(RegisteredComponent.CARD_COMPONENT.componentName)
    const img = document.createElement('img')
    img.setAttribute('slot', 'card-face')
    console.log(this.#cardFolderPath)
    img.src = `${this.#cardFolderPath}/${card.fileName}`
    cardComponent.appendChild(img)
    this.#playerView.appendChild(cardComponent)
  }

  #renderCardForDealer (card) {
    const cardComponent = document.createElement(RegisteredComponent.CARD_COMPONENT.componentName)
    const img = document.createElement('img')
    img.setAttribute('slot', 'card-face')
    console.log(this.#cardFolderPath)
    img.src = `${this.#cardFolderPath}/${card.fileName}`
    cardComponent.appendChild(img)
    this.#dealerView.appendChild(cardComponent)
  }

  #updatePlayerFundsView (funds) {
    this.#fundsView.textContent = funds
  }

  #addEventListeners () {
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_HIT.event, this.#onPlayer_Hit.bind(this), { signal: this.#abortController.signal })
    this.#gameComponent.addEventListener(ComponentEvent.PLAYER_STAND.event, this.#onPlayer_Stand.bind(this), { signal: this.#abortController.signal })
    this.#betView.addEventListener(ComponentEvent.PLAYER_BET.event, this.#onPlayer_Bet.bind(this), { signal: this.#abortController.signal })
  }

  #toggleBetView () {
    if (this.#betView.style.display !== 'None') {
      this.#betView.style.display = 'None'
    } else {
      this.#betView.style.display = 'Block'
    }
  }

  #onPlayer_Bet (eventObj) {
    this.#currentBet = eventObj.detail
    this.#toggleBetView()
    this.#player.deductFunds(this.#currentBet)
    this.#updatePlayerFundsView(this.#player.funds)
    this.#startGame()
    console.log(this.#cardFolderPath)
  }

  #onPlayer_Hit () {
    console.log(this)
  }

  #onPlayer_Stand () {
  }
}
