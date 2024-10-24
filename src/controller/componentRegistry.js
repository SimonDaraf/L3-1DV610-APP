import { MainMenuComponent } from './components/main-menu/mainMenuComponent.js'
import { RegisteredComponent } from './registeredComponents.js'

/**
 * The component registry handles every registered component and is responsible accessing and returning component instances.
 */
export class ComponentRegistry {
  /**
   * Defines all components within the application.
   */
  async defineComponents () {
    const mainMenuComponent = new MainMenuComponent(RegisteredComponent.MAIN_MENU_COMPONENT)
    await mainMenuComponent.defineComponent()
  }
}
