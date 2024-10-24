import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a CardComponent, responsible for rendering a card.
 */
export class CardComponent extends WebComponent {
  /**
   * Constructs an instance of a CardComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('card.html', MODULE_PATH), new URL('card.css', MODULE_PATH))
  }
}
