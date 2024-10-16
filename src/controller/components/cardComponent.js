import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../registeredComponents.js'

/**
 * Represents a CardComponent, responsible for the underlying control logic of a playing card.
 */
export class CardComponent extends WebComponent {
  /**
   * Constructs an instance of a CardComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName)
  }
}
