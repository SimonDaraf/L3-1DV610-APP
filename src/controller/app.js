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
    this.#addEventListeners(ComponentEvent.START.event, this.#onStart)

    const componentRegistry = new ComponentRegistry()
    await componentRegistry.registerComponents()

    this.#appendElementToContainer(document.createElement(RegisteredComponent.MAIN_MENU_COMPONENT.componentName))
  }

  #addEventListeners (eventName, eventFunction) {
    document.addEventListener(eventName, eventFunction)
  }

  #appendElementToContainer (element) {
    this.#container.appendChild(element)
  }

  #onStart () {
    this.#tryRemoveComponent(RegisteredComponent.MAIN_MENU_COMPONENT.componentName)
    const gameComponent = document.createElement(RegisteredComponent.GAME_COMPONENT.componentName)
    this.#appendElementToContainer(gameComponent)
    this.#gameController = new GameController(gameComponent)
    this.#gameController.addEventListener(ComponentEvent.GAME_OVER.event, this.#onGameOver)
  }

  #onGameOver () {
    console.log('lost')
  }

  #tryRemoveComponent (componentName) {
    try {
      const mainMenu = document.querySelector(componentName)
      this.#container.removeChild(mainMenu)
    } catch (e) {
      return
    }
  }
}