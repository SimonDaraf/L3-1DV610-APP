import { ComponentRegistry } from './componentRegistry.js'
import { ComponentEvent } from './events/componentEvents.js'
import { RegisteredComponent } from './registeredComponents.js'
import { GameController } from './gameController.js'

/**
 * App controls the actual application.
 */
export class App {
  #container
  #abortController
  #gameController

  /**
   * Constructs an instance of the app class.
   */
  constructor () {
    this.#container = document.getElementById('container')
    this.#abortController = new AbortController()
  }

  /**
   * The starting point of the application.
   */
  async main () {
    const componentRegistry = new ComponentRegistry()
    await componentRegistry.registerComponents()

    const mainMenuElement = document.createElement(RegisteredComponent.MAIN_MENU_COMPONENT.componentName)
    this.#appendElementToContainer(mainMenuElement)
    this.#addEventListeners(ComponentEvent.START.event, this.#onStart)
  }

  #appendElementToContainer (element) {
    this.#container.appendChild(element)
  }

  #addEventListeners (eventName, eventFunction) {
    document.addEventListener(eventName, eventFunction.bind(this), { signal: this.#abortController.signal })
  }

  #abortCurrentListeners () {
    this.#abortController.abort()
    this.#abortController = new AbortController() // Abort is one time use, so we need a new abort controller.
  }

  #tryRemoveComponent (componentName) {
    try {
      const mainMenu = document.querySelector(componentName)
      this.#container.removeChild(mainMenu)
    } catch (e) {
    }
  }

  #createGameController () {
    const gameComponent = document.createElement(RegisteredComponent.GAME_COMPONENT.componentName)
    this.#appendElementToContainer(gameComponent)
    this.#gameController = new GameController(gameComponent)
    this.#gameController.addEventListener(ComponentEvent.GAME_OVER.event, this.#onGameOver.bind(this))
  }

  #onStart () {
    this.#abortCurrentListeners()
    this.#tryRemoveComponent(RegisteredComponent.MAIN_MENU_COMPONENT.componentName)
    this.#createGameController()
  }

  #onBackToMainMenu () {
    this.#abortCurrentListeners()
    this.#tryRemoveComponent(RegisteredComponent.GAME_OVER_COMPONENT.componentName)
    const mainMenuElement = document.createElement(RegisteredComponent.MAIN_MENU_COMPONENT.componentName)
    this.#appendElementToContainer(mainMenuElement)
    this.#addEventListeners(ComponentEvent.START.event, this.#onStart)
  }

  #onTryAgain () {
    this.#abortCurrentListeners()
    this.#tryRemoveComponent(RegisteredComponent.GAME_OVER_COMPONENT.componentName)
    this.#createGameController()
  }

  #onGameOver () {
    this.#abortCurrentListeners()
    this.#gameController.abortListeners()
    this.#tryRemoveComponent(RegisteredComponent.GAME_COMPONENT.componentName)
    const gameOverMenu = document.createElement(RegisteredComponent.GAME_OVER_COMPONENT.componentName)
    this.#appendElementToContainer(gameOverMenu)
    this.#addEventListeners(ComponentEvent.TRY_AGAIN.event, this.#onTryAgain)
    this.#addEventListeners(ComponentEvent.MAIN.event, this.#onBackToMainMenu)
  }
}
