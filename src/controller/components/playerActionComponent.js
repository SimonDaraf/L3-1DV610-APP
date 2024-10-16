import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../registeredComponents.js'

/**
 * Represents a PlayerActionComponent, responsible for the underlying control logic of a player action.
 */
export class PlayerActionComponent extends WebComponent {
  /**
   * Constructs an instance of a PlayerActionComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName)
  }
}
