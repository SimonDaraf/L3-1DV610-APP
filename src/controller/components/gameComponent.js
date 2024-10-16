import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../registeredComponents.js'

/**
 * Represents a GameComponent, responsible for the underlying control logic of the game cycle.
 */
export class GameComponent extends WebComponent {
  /**
   * Constructs an instance of a GameComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName)
  }
}
