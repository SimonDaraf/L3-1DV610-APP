import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../registeredComponents.js'

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
    super(componentIdentifier.componentName)
  }
}
