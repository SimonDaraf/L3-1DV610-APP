import { ComponentRegistry } from './componentRegistry.js'
import { ComponentEvent } from './events/componentEvents.js'
import { RegisteredComponent } from './registeredComponents.js'

/**
 * App controls the actual application.
 */
export class App {
  #container

  /**
   * Constructs an instance of the app class.
   */
  constructor () {
    this.#container = document.getElementById('container')
  }

  /**
   * The starting point of the application.
   */
  async main () {
    this.#addEventListeners()

    const componentRegistry = new ComponentRegistry()
    await componentRegistry.registerComponents()

    this.#appendElementToBody(document.createElement(RegisteredComponent.MAIN_MENU_COMPONENT.componentName))
  }

  #addEventListeners () {
    document.addEventListener(ComponentEvent.START.event, this.#onStart)
  }

  #appendElementToBody (element) {
    this.#container.appendChild(element)
  }

  #onStart () {
    console.log('start')
  }
}