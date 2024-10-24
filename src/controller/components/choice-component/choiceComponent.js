import { EventContainer, WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'
import { HtmlEvent } from '../../events/htmlEvents.js'
import { ComponentEvent } from '../../events/componentEvents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a ChoiceComponent, responsible for displaying available choices (bet, hit).
 */
export class ChoiceComponent extends WebComponent {
  /**
   * Constructs an instance of a ChoiceComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('choice.html', MODULE_PATH), new URL('choice.css', MODULE_PATH))
    this.#addEvents()
  }

  #addEvents () {
    this.registerEvent(new EventContainer(HtmlEvent.CLICK.event, '', this.#onPlayer_Choice))
  }

  /**
   * On choice button click.
   *
   * @param {MouseEvent} mouseEvent - The mouse event object.
   */
  #onPlayer_Choice (mouseEvent) {
    const choiceButton = mouseEvent.composedPath()[0]

    let event
    if (choiceButton.id === 'hit-button') {
      event = ComponentEvent.PLAYER_HIT.event
    } else if (choiceButton.id === 'stand-button') {
      event = ComponentEvent.PLAYER_STAND.event
    } else {
      return
    }

    this.dispatchEvent(new CustomEvent(event, {
      bubbles: true
    }))
  }
}
