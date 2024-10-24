import { EventContainer, WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'
import { HtmlEvent } from '../../events/htmlEvents.js'
import { ComponentEvent } from '../../events/componentEvents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a MainMenuComponent, responsible for the underlying control logic of the main menu.
 */
export class MainMenuComponent extends WebComponent {
  /**
   * Constructs an instance of a MainMenuComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('mainMenu.html', MODULE_PATH), new URL('mainMenu.css', MODULE_PATH))
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
    // Composed path contains every node the event traveled through, so zero is the element that dispatched the event.
    if (mouseEvent.composedPath()[0].id === 'start_button') {
      mouseEvent.stopPropagation()
      mouseEvent.preventDefault()
      mouseEvent.target.dispatchEvent(new CustomEvent(ComponentEvent.START.event, {
        bubbles: true
      }))
    }
  }
}
