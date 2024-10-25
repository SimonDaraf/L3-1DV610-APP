# Reflection
The reflection will cover additions to both L2 and L3.

[L2 repo can be found here](https://github.com/SimonDaraf/simplified-web-components)

## Chapter 2: Meaningful Names
Following some of the guidelines here did not prove to be that much of a departure from how I usually name variables.
Certain methods do have some questionable names. `dealerTurnCycle` is a method used by the GameController class, which handles one iteration of the dealers turn. Other than that most methods do use a verb to describe the core actioon that is to be performed. One deviation from what a "common" naming convention would look like is:
```js
#onPlayer_Stand () {
  this.#togglePlayerChoiceView()
  this.#takeDealerTurn()
}
```
A bunch of these names can be found relating to the event listener functions. This is mostly due to how I planned the event names relating to the specific dispatcher (And because of C#)
## Chapter 3: Functions
I did try my best following the guides stated throughout the book. Keeping function short, try do only do one thing etc. This worked quite well in the beginning when working
on the model portion of the application. Were it fell apart was with the controllers and components. Looking at the constructor for `GameController` it is long and does a bunch of things, and that is after refactoring some of the logic into other classes. There are also cases where the level of indentation goes over one. I'm stating it because I know the book mentions it but when concidering one extra level of indentation versus a whole other function for one line of code, one extra level of indentation doesn't soom so "un-clean".

```js
constructor (gameComponent) {
  super()

  this.#gameComponent = gameComponent
  this.#abortController = new AbortController()

  this.#blackJackInstance = new BlackJack(new Deck())

  this.#cardFolderPath = new URL('../view/cards', import.meta.url).toString()

  this.#choiceView = this.#gameComponent.shadowRoot.querySelector('#choice')
  this.#betView = document.createElement(RegisteredComponent.BET_COMPONENT.componentName)
  this.#playerChoiceView = document.createElement(RegisteredComponent.CHOICE_COMPONENT.componentName)

  const playerView = this.#gameComponent.shadowRoot.querySelector('#player-hand')
  const fundsView = this.#gameComponent.shadowRoot.querySelector('#fund-displayer')
  this.#playerController = new PlayerController(playerView, fundsView)

  const dealerView = this.#gameComponent.shadowRoot.querySelector('#dealer-hand')
  this.#dealerController = new DealerController(dealerView)

  this.#choiceView.appendChild(this.#betView)
  this.#choiceView.appendChild(this.#playerChoiceView)
  this.#togglePlayerChoiceView()

  this.#addEventListeners()
}
```

## Chapter 4: Comments
A method I used to follow the principles declared where to set a rule, if the method has a clear and eaasy name and is private, there is no need to add a coomment. 
## Chapter 5: Formatting
## Chapter 6: Objects and Data Structures
## Chapter 7: Error Handling
## Chapter 8: Boundaries
The application is heavily dependant on the simplified web components package (L2). This is simply due to it being a package that handles UI, something that can't really be alleviated
to elsewhere.
## Chapter 9: Unit Tests
## Chapter 10: Classes
## Chapter 11: Systems