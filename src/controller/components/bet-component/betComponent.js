import { EventContainer, WebComponent } from 'simplified-web-components'
import { RegisteredComponent } from '../../registeredComponents.js'
import { HtmlEvent } from '../../events/htmlEvents.js'
import { ComponentEvent } from '../../events/componentEvents.js'

const MODULE_PATH = import.meta.url

/**
 * Represents a BetComponent, responsible for displaying available bets.
 */
export class BetComponent extends WebComponent {
  /**
   * Constructs an instance of a BetComponent.
   *
   * @param {RegisteredComponent} componentIdentifier - The unique component identifier.
   */
  constructor (componentIdentifier) {
    super(componentIdentifier.componentName, new URL('bet.html', MODULE_PATH), new URL('bet.css', MODULE_PATH))
    this.#addEvents()
  }

  #addEvents () {
    this.registerEvent(new EventContainer(HtmlEvent.CLICK.event, '', this.#onPlayer_Bet))
  }

  /**
   * On bet button click.
   *
   * @param {MouseEvent} mouseEvent - The mouse event object.
   */
  #onPlayer_Bet (mouseEvent) {
    const betButton = mouseEvent.composedPath()[0]
    if (!(betButton.className === 'bet-button')) {
      return
    }
    const betValue = betButton.textContent.replace('$', '')
    this.dispatchEvent(new CustomEvent(ComponentEvent.PLAYER_BET.event, {
      bubbles: true,
      detail: betValue
    }))
  }
}
