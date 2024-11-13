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

Here the user has selected a bet value, instead of returning a boolean to indicate whether this was successful we throw an error, which is the catched:

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
## Chapter 9: Unit Tests
## Chapter 10: Classes
## Chapter 11: Systems