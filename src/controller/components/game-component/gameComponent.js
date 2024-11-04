import { EventContainer, WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'
import { ComponentEvent } from '../../events/componentEvents'

const MODULE_PATH = import.meta.url

/**
 * Responsible for parsing user inputs and transfering that the the actual game logic.
 */
export class GameComponent extends WebComponent {
  /**
   * Constructs an instance of a GameComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('game.html', MODULE_PATH), new URL('game.css', MODULE_PATH))
  }
}
