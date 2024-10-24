/**
 * An enum like class containing component definitions, used to aliviate string dependencies when creating components.
 */
export class RegisteredComponent {
  static MAIN_MENU_COMPONENT = new RegisteredComponent('main-menu-component')
  static GAME_COMPONENT = new RegisteredComponent('game-component')

  #componentName

  constructor (componentName) {
    this.#componentName = componentName
  }

  /**
   * The registered component name, used to create the component in the DOM.
   *
   * @type {String}
   */
  get componentName () {
    return this.#componentName
  }
}
