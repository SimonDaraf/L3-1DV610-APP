import { MainMenuComponent } from './components/main-menu/mainMenuComponent.js'
import { RegisteredComponent } from './registeredComponents.js'

/**
 * The component registry handles every registered component and is responsible accessing and returning component instances.
 */
export class ComponentRegistry extends EventTarget {
  /**
   * Defines all components within the application.
   */
  async registerComponents () {
    const components = []
    components.push(new MainMenuComponent(RegisteredComponent.MAIN_MENU_COMPONENT))
    this.#defineComponents(components)
  }

  async #defineComponents (components) {
    for (const component of components) {
      component.defineComponent()
    }
  }
}
