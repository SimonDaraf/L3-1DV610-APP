import { EventContainer, WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'
import { HtmlEvent } from '../../events/htmlEvents.js'
import { ComponentEvent } from '../../events/componentEvents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a GameOverComponent, responsible for the underlying control logic of the game over menu.
 */
export class GameOverComponent extends WebComponent {
  /**
   * Constructs an instance of a GameOverComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('gameOver.html', MODULE_PATH), new URL('gameOver.css', MODULE_PATH))
    this.#addEvents()
  }

  #addEvents () {
    this.registerEvent(new EventContainer(HtmlEvent.CLICK.event, '', this.#onButtonStart_Click))
  }

  /**
   * On start button click.
   *
   * @param {MouseEvent} mouseEvent - The mouse event object.
   */
  #onButtonStart_Click (mouseEvent) {
    mouseEvent.stopPropagation()
    mouseEvent.preventDefault()
    // Composed path contains every node the event traveled through, so zero is the element that dispatched the event.
    if (mouseEvent.composedPath()[0].id === 'start-button') {
      mouseEvent.target.dispatchEvent(new CustomEvent(ComponentEvent.TRY_AGAIN.event, {
        bubbles: true
      }))
    } else if (mouseEvent.composedPath()[0].id === 'main-button') {
      mouseEvent.target.dispatchEvent(new CustomEvent(ComponentEvent.MAIN.event, {
        bubbles: true
      }))
    }
  }
}
