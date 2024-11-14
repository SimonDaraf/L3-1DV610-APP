# Reflection
The reflection will cover additions to both L2 and L3.

[L2 repo can be found here](https://github.com/SimonDaraf/simplified-web-components)

## Chapter 2: Meaningful Names
I decided to favor longer names, to effectively be able to more clearly communicate what either a variable name or method name entailed. Of course there are classic cases like:

```js
/**
 * @type {Hand}
 */
#hand
```

Is hand a "meaningful name" does it reveal some "intention". Hard to say, not every member is some convoluted specialized class where the name will deviate from the type used.
Simple constructs like `Hand`, `Deck`, `Card` make it hard to give it a name other than the type in my opinion, thus making the name not so meaningful.

Methods mostly follow the rule of describing an action (verb). With a few outliers:

```js
htmlElementConstructor (componentName, html, css, events)
```

This is a method from L2 in `htmlElementConstructor.js`. Pherhaps a better name would have been `constructCustomHtmlElement` or `defineCustomHtmlElement`. But simply what it is is a constructor, so in my opinion the name fit.

## Chapter 3: Functions

Here we can once again look at `htmlElementConstructor`. Here is the full method:

```js
/**
 * A util function that defines a custom HTML element to the registry.
 *
 * @param {string} componentName - The name to register the element with.
 * @param {HTMLTemplateElement} html - The HTML to append.
 * @param {HTMLTemplateElement} css - The CSS to append.
 * @param {EventContainer[]} events - Events to append.
 */
htmlElementConstructor (componentName, html, css, events) {
  // Due to how HTML elements are created (not using new) this is a necessity.
  // Especially if we want to make it somewhat modular.
  customElements.define(componentName,
    /**
     * The custom element constructor.
     */
    class extends HTMLElement {
      /**
       * The abort controller object, used to properly remove any event listeners
       * when the element leaves the DOM.
       *
       * @type {AbortController}
       */
      #abortController

      /**
       * Constructs a new instance of the user-defined HTMLElement.
       */
      constructor () {
        super()

        // Attach a shadow DOM tree to this custom element and
        // append the templates to the shadow root.
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(css.content.cloneNode(true))
        this.shadowRoot.appendChild(html.content.cloneNode(true))

        this.#abortController = new AbortController()
      }

      /**
       * Called after the element is inserted into the DOM.
       */
      connectedCallback () {
        for (const event of events) {
          const targetElement = this.#getTargetElement(event.eventListenerElementID)

          targetElement.addEventListener(event.eventName, event.eventFunction, { signal: this.#abortController.signal })
        }
      }

      /**
       * Called after the element is removed from the DOM.
       */
      disconnectedCallback () {
        this.#abortController.abort()
      }

      #getTargetElement (targetID) {
        if (targetID === 'shadow-root') {
          return this
        } else {
          return this.shadowRoot.querySelector(targetID)
        }
      }
    }
  )
}
```

Lets first look at indentation. This method has a total of four levels of indentation. This is a result of the inline class definition, which sadly is a necessity due to how custom html elements are defined. Remove this and suddenly we have a normal class with one extra level of indentation at most (*for* and *if*).

Secondly we have the amount of arguments. This method has a total of four arguments. And no matter how we move things around, we need all four somehow. So we can either have four arguments or complicate the class lifecycle with a setup phase. Which in my opinion makes things more complicated rather than a couple of arguments.

Another method is:

```js
#appendCardsToDeck () {
  for (const suit of Object.values(CardSuit)) {
    for (const rank of Object.values(CardRank)) {
      this.#playingCards.push(new Card(suit, rank))
    }
  }
}
```

There are one or two cases where we have more than one level of indentation. In this specific case, I don't really see another way to do this without just cluttering the class.
The logic is in one way thightly coupled.

## Chapter 4: Comments
A strategy I used here to avoid cluttering the codebase with comments is to first determine where comments could be needed when it comes to methods. One problem with JavaScript
is that the language is not strictly typed. This means that there is a tradeoff, either we comment *every* method to ensure that the reader clearly knows any types of the arguments used, or we don't comment it, leaving the reader in the dark. Lets take this method from `playerController.js`

```js
#addFunds (currentBet) {
  this.#funds += currentBet
}
```

If we we're to add a comment, it would look like this:

```js
/**
 * Adds funds to the player.
 *
 * @type {number} currentBet - The current bet.
 **/
#addFunds (currentBet) {
  this.#funds += currentBet
}
```

Taking the section of `Noise Comments` from Clean Code, this example is very similar to the examples given in the book. So what I decided to do here is to not comment private methods but only public methods. This means that any developer interacting with the class will know how to interact with said method(s). But the downside is new developers could be left in the dark when it comes to what type an argument is.

Where I did decide to clutter the code base is private members of a class. Once again going back to JavaScripts lack of types. I decided to use *partial comments*, normally a variable comment in javascript would look like:

```js
/**
 * The dealer.
 *
 * @type {Player}
 **/
#dealer
```

"The dealer" is obvious, the name says it. But one could guess that this was used by a `Dealer` class and not `Player`.
I decided to instead do:

```js
/**
 * @type {Player}
 **/
#dealer
```

In my opinion, the noise from the comment is removed. The type in JavaScripts case is not noise, it is relevant information.

## Chapter 5: Formatting

First looking at vertical formatting Robert C. Martin describes that his desired vertical format resembles a newspaper (p. 77). With high level components being higher up and low level components lower down. I tried to achieve this by structuring a class as follows:

1. Class definition
2. Private members
3. Constructor
4. Public methods
5. Private methods

One example of this woulld be `blackjack.js` which looks like this:

```js
/**
 * Responsible for the black jack game logic.
 *
 * @event blackjack::onplayercard - Dispatched when the player recieves a card.
 * @event blackjack::ondealercard - Dispatched when the dealer recieves a card.
 */
export class BlackJack extends EventTarget {
  /**
   * @type {Player}
   */
  #player

  /**
   * @type {Player}
   */
  #dealer

  /**
   * @type {Deck}
   */
  #deck

  /**
   * @type {BlackJackRules}
   */
  #rules

  /**
   * Constructs an instance of a black jack game.
   */
  constructor () {
    super()

    this.#player = new Player(new Hand())
    this.#dealer = new Player(new Hand())
    this.#deck = new Deck()
    this.#rules = new BlackJackRules()
  }

  /**
   * Sets up the game.
   */
  startGame () {
    this.#deck.shuffle()
    this.#dealCard(BlackJackEvent.PLAYER_CARD, this.#player)
    this.#dealCard(BlackJackEvent.DEALER_CARD, this.#dealer)
    this.#dealCard(BlackJackEvent.PLAYER_CARD, this.#player)
  }

  /**
   * Get game results based on current game state.
   *
   * @returns {Result} - The game result.
   */
  getGameResults () {
    return this.#rules.evaluateWinner(this.#player.hand, this.#dealer.hand)
  }

  /**
   * Resets the game state.
   */
  reset () {
    const playerCards = this.#player.emptyHand()
    const dealerCards = this.#dealer.emptyHand()
    this.#deck.addCardsToDeck(playerCards)
    this.#deck.addCardsToDeck(dealerCards)
  }

  /**
   * Player hits.
   * If the player is busted the method will return false.
   *
   * @returns {boolean} - If the player still can perform an action.
   */
  playerHit () {
    return !this.#onHit(BlackJackEvent.PLAYER_CARD, this.#player)
  }

  /**
   * Lets the dealer perform their turn.
   */
  takeDealerTurn () {
    this.#dealCard(BlackJackEvent.DEALER_CARD, this.#dealer)

    if (this.#rules.isHandNaturalWinner(this.#dealer.hand)) {
      return
    }

    let shouldStop = false
    while (!shouldStop) {
      shouldStop = this.#takeDealerCycle()
    }
  }

  #takeDealerCycle () {
    if (this.#rules.canDealerHit(this.#dealer.hand)) {
      return this.#onHit(BlackJackEvent.DEALER_CARD, this.#dealer)
    }
    return true
  }

  #onHit (event, player) {
    this.#dealCard(event, player)
    return this.#rules.isHandBusted(player.hand)
  }

  #dealCard (event, player) {
    const card = this.#deck.popTopCard()
    player.addCardToHand(card)
    this.#dispatchPlayerCardEvent(event, card)
  }

  #dispatchPlayerCardEvent (event, card) {
    this.dispatchEvent(new CustomEvent(event.event, {
      bubbles: true,
      detail: card
    }))
  }
}
```

One downside to this structure is another recommendation from Clean Code, that methods that are closely related should be close to each other, can be easily broken. If we look at `startGame`, it calls `#dealCard` which is the second last method in the class. Here we have an issue where the method is common enough to be utilized at a few places within the class. So evaluating whether to place methods closer to each other or structuring the class in the way mentioned above I tend to favor keeping every private method beneath the prublic methods.

## Chapter 6: Objects and Data Structures

The application features a few classes that *could* be concidered data structures more than actual functional classes. Looking at the `Card` class in `card.js` we have no real functionality in the form of methods but only getters and setters. The *could* comes from the fact that the setters are private, so manipulation of the data is not possible, this is ofcourse intended as we don't want to directly modify either the suit or rank of a card.

Other than that I would also like to discuss another form of data structure pherhaps more relevant for this appllication rather than what's directly discussed in the chapter. There are a lot of classes that look like this:

```js
/**
 * An enum like class containing card suits.
 */
export class CardSuit {
  static HEARTS = new CardSuit('hearts')
  static DIAMONDS = new CardSuit('diamonds')
  static CLUBS = new CardSuit('clubs')
  static SPADES = new CardSuit('spades')

  /**
   * @type {string}
   */
  #value

  constructor (value) {
    this.#value = value
  }

  /**
   * The card suit value.
   *
   * @type {string}
   */
  get value () {
    return this.#value
  }
}
```

I thought it might be smart to mention these classes. JavaScript does not have any enums or other forms of literals. There are other ways to achieve this functionality. One is using the `Object.freeze()` method, like this:

```js
export const suits = Object.freeze({
  HEARTS: 'hearts',
  -- etc --
})
```

This also lets us achieve a similar usage, but does not give us any way to document the usage of any literals. Using the class example with static members we achieve a strict
type enum usage, we also alleviate certain string dependencies that would otherwise arise.

## Chapter 7: Error Handling

Due to JavaScript not having a form of assert that is strictly used to let programmers know that a problem has ocurred that needs to be fixed. We instead throw a normal error and don't catch it. One of these examples are:

```js
#setSuit (suit) {
  if (!(suit instanceof CardSuit)) {
    throw new Error('Invalid card suit.')
  }
  this.#suit = suit
}
```

This error is not meant to be catched, suits are a collection of static literals, if this assembly fails it must be evaluated directly. So this is an example of the assert strategy.

One example where we actually use error handling as functionality is:

`playerController.js`
```js
/**
 * Tries to place a bet.
 *
 * @throws {Error} - If not enough funds to place bet.
 * @param {number} bet - The bet to place.
 */
tryPlaceBet (bet) {
  if (bet > this.#funds) {
    throw new Error('Not enough funds.')
  }
  this.#currentBet = bet
  this.#deductFunds(this.#currentBet)
  this.#updatePlayerFundsView(this.#funds)
}
```

Here the user has selected a bet value, instead of returning a boolean to indicate whether this was successful we throw an error, which is then catched:

`gameController.js`
```js
try {
  this.#playerController.tryPlaceBet(bet)
} catch (error) {
  window.alert('Not enough funds!')
  return
}
```

This way this runtime error becomes more of a clear indication that the process can't continue, it also communicates the fact that we abort the current operation a bit better than a
`return false` in the middle of the method.

## Chapter 8: Boundaries

A good way to work with third party code is to use a sort of facade or wrapper around the code that directly utilizes said API. For example:

`In House Code -Uses-> API Wrapper Interface <-implements- API Wrapper Instance -Uses-> API`. 

This way we can one, utilize polymorphism to change between different API's utillizing the same interface wrapper and two, if the API changes the wrapper is the only thing that needs to change, not the actual usage within the codebase. The problem with this approach in our case is the lack of interfaces. But we can still alliviate said functionality in other ways. Looking at the current implementation of L2 `simplified-web-components`:

```js
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

    if (Number.isNaN(betValue)) {
      throw new Error('Invalid bet value, if you get this the source code is not working.')
    }

    this.dispatchEvent(new CustomEvent(ComponentEvent.PLAYER_BET.event, {
      bubbles: true,
      detail: betValue
    }))
  }
}
```

Here the component extends the `WebComponent` class from L2. Which means that we can alliviate some responsibilities from the creator of the components and let the instance manage its
own setup cycle.

This doesn't really provide the same functionallity as a wrapper would, but it does "ground" the package somewhat within the context of the application. One downside to this structure is that if the package should change, each component still needs to reflect that change.

## Chapter 9: Unit Tests

The unit test portion of L3 only reflects the model portion of the application to an extent. Given that the rest of the application is mostly UI, a huge portion of that needed to be done via manual tests. For L2 some unit test cases did indeed handle UI portions, mainly the creation of components (`webcomponents.test.js`).

One principle states in clean code is one assert per test, followed by single concept per test. Two tests from `cardSuit.test.js` looks like this:

```js
test('Assert strict comparison of suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts === CardSuit.HEARTS).toBeTruthy()
  expect(suitDiamonds === CardSuit.DIAMONDS).toBeTruthy()
  expect(suitClubs === CardSuit.CLUBS).toBeTruthy()
  expect(suitSpades === CardSuit.SPADES).toBeTruthy()
})

test('Assert instanceof suits', () => {
  const suitHearts = CardSuit.HEARTS
  const suitDiamonds = CardSuit.DIAMONDS
  const suitClubs = CardSuit.CLUBS
  const suitSpades = CardSuit.SPADES

  expect(suitHearts).toBeInstanceOf(CardSuit)
  expect(suitDiamonds).toBeInstanceOf(CardSuit)
  expect(suitClubs).toBeInstanceOf(CardSuit)
  expect(suitSpades).toBeInstanceOf(CardSuit)
})
```

Here we can see that there is more than one expect, but I would still argue that the concept is the same. It is just that we want to cover more than one instance for the same concept. This is more due to the class being tested but it still serves as an example.

## Chapter 10: Classes

Before going in to the grey zone, proper encapsulation is used. Classes have private members that have specified getters if needed. Classes also have certain public entry methods to properly work with other classes.

Two things Robert C. Martin touches on in chapter 10 is SRP (Single Responsibility Principle) and the size of classes (small). These principles are often easier to follow when working in the problem domain.
Taking a look at the classes within the model package, we can see that the largest class is `blackjack.js` at around 120 lines of code (with comments). This is reasonable because the BlackJack class acts as the director for the game logic. Refactoring has also been applied here. We for an example have a BlackJackRules class which is responsible for the rules of the game. This was first a part of the BlackJack class itself.

Moving over to the controller package we have classes like `GameController`. Here is we move out of the problem domain and in to pure software principles. The code now acts as a sort of intermediary between the model and the UI, as I have touched on previously working with certain UI elements can get quite muddy. Here the largest class is `GameController`. It acts as the entry point for the game specific controllers, it handles the blackjack game instance and delegates specific UI events to relevant controllers. Some parts of GameController could of course be refactored out into separate classes. A prior version for example had a lot more responsibilities and certain part of the blackjack logic was actually handled in the controller instead of the BlackJack class. This has been sorted but certain responsibilities still persist. Looking at for example these methods:

```js
#toggleBetView () {
  if (this.#betView.style.display !== 'none') {
    this.#betView.style.display = 'none'
  } else {
    this.#betView.style.display = 'block'
  }
}

#togglePlayerChoiceView () {
  if (this.#playerChoiceView.style.display !== 'none') {
    this.#playerChoiceView.style.display = 'none'
  } else {
    this.#playerChoiceView.style.display = 'block'
  }
}
```

Should these methods be a part of the GameController, or should they be refactored into a BetController and ChoiceController. That was something I concidered. The problem here is then how to we handle the flow of communication. We would need to delegate some sort of command from those controllers back to gameController. Sadly due to this project already exceeding the time limit, I have decided to not further refactor and instead try to get this across the finish line. But it is still wise to comment on some of these flaws that directly break the SRP of certain classes.

## Chapter 11: Systems

One of the first things that this chapter touched on was "Separate Constructing a System from using it". In my opinion this was done quite nicely in this project. The `ComponentRegistry` class is responsible for defining each custom WebComponent used within the application:

```js
export class ComponentRegistry extends EventTarget {
  /**
   * Defines all components within the application.
   */
  async registerComponents () {
    const components = []
    components.push(new MainMenuComponent(RegisteredComponent.MAIN_MENU_COMPONENT))
    components.push(new GameComponent(RegisteredComponent.GAME_COMPONENT))
    components.push(new BetComponent(RegisteredComponent.BET_COMPONENT))
    components.push(new CardComponent(RegisteredComponent.CARD_COMPONENT))
    components.push(new ChoiceComponent(RegisteredComponent.CHOICE_COMPONENT))
    components.push(new GameOverComponent(RegisteredComponent.GAME_OVER_COMPONENT))
    this.#defineComponents(components)
  }

  async #defineComponents (components) {
    for (const component of components) {
      component.defineComponent()
    }
  }
}
```

The `RegisteredComponent.XXX` is a static collection that contains each custom element name. This means that instead of writing `document.createElement('game-component')`, we would write `document.createElement(RegisteredComponent.GAME_COMPONENT.componentName)`. Although quite long, this helps with alleviating string dependencies from the usage of constructed (defined) components. We have also made sure that the definition of a component is neatly packed into a single point of the application, so extending available components is easy.

Although this project doesn't directly contain "true dependency injection" as described in the book, where certain dependencies are declared and resolved via for example the Spring Framework in Java and the Dependency Injection NuGet package for C#. We still utilize dependency injection for certain classes. One instance where this is used is in the GameController when setting up both the PlayerController and DealerController.

`from GameController constructor row 73`
```js
const playerView = this.#gameComponent.shadowRoot.querySelector('#player-hand')
const fundsView = this.#gameComponent.shadowRoot.querySelector('#fund-displayer')
this.#playerController = new PlayerController(playerView, fundsView)

const dealerView = this.#gameComponent.shadowRoot.querySelector('#dealer-hand')
this.#dealerController = new DealerController(dealerView)
```

Looking past the string dependencies (I could go into the amount of work to alleviate each instance of a HTML class or id identifier...), each ellement passed into the controllers are a part of the shadowRoot from the parent component. Which means that these elements are *only* accessible if we have an instance of the parent element. This means that it is better to inject these elements from the GameController instead of directly exposing the whole shadowRoot in some way.

## Closing Thoughts

These reflections didn't fit any one chapter in my opinion so I put them here, if we are not allowed to further reflect aside from the point of view of each chapter. Then this part can be skipped.

I thought it would be interesting to reflect on the overall work done. My strategy going in was to first get things to work and clean up after. That doesn't mean I didn't have a strategy on how components should communicate and the overall structure. But I clearly didn't take everything into account. For example looking at the `simplified-web-components` package. The goal with the package was to simplify the construction of custom web components by abstracting the creation and letting the user only focus on the important parts, it also made working with web components more object oriented in a way. Because we could now represent components as actual classes. The problem is that the abstraction made construction easier but made usage way more complicated. One thing lost was responsibilities. 

Who is responsible in handling the components event delegates. I thought the answer was the class responsible used to construct the custom component. But after construction we could no longer construct it again. Or we could but that meant that we had to avoid defining it again, as that would throw an error. This is the reason I decided to utilize the component classes only for construction and use separate controllers to handle the delegates. But this resulted in problems when it came to the scopes of delegate functions. When a event delegate is passed to the controller the scope of said delegate is still inside the custom element constructor. In order to work around this each delegate had to be bound to the instance handling the delegate `.bind(this)`. Which is quite an ugly solution. Had I had more insight beforehand I believe the usage of these custom components would have been a lot more clean.