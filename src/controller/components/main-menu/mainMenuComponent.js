import { WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a MainMenuComponent, responsible for the underlying control logic of the main menu.
 */
export class MainMenuComponent extends WebComponent {
  #START_BUTTON_ID = 'start_button'

  /**
   * Constructs an instance of a MainMenuComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('mainMenu.html', MODULE_PATH), new URL('mainMenu.css', MODULE_PATH))
  }

  /**
   * On button start click.
   *
   * @param {MouseEvent} clickEvent 
   */
  #onButtonStart(clickEvent) {
    this.dispatchEvent(new CustomEvent())
  }
}
