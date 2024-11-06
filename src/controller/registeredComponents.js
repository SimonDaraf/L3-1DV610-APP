/**
 * An enum like class containing component definitions, used to aliviate string dependencies when creating components.
 */
export class RegisteredComponent {
  static MAIN_MENU_COMPONENT = new RegisteredComponent('main-menu-component')
  static GAME_OVER_COMPONENT = new RegisteredComponent('game-over-component')
  static GAME_COMPONENT = new RegisteredComponent('game-component')
  static BET_COMPONENT = new RegisteredComponent('bet-component')
  static CHOICE_COMPONENT = new RegisteredComponent('choice-component')
  static CARD_COMPONENT = new RegisteredComponent('card-component')

  /**
   * @type {string}
   */
  #componentName

  constructor (componentName) {
    this.#componentName = componentName
  }

  /**
   * The registered component name, used to create the component in the DOM.
   *
   * @type {string}
   */
  get componentName () {
    return this.#componentName
  }
}
