# TODO
Add functionality to switch button. // Button commented out for now, as user can edit bottom amount, as well.
Style link list in dropdown menu.
Currency input should show flag- currency short form - currency long form.


### BUGS
- When user clicks hamburger menu -> link, the menu does not collapse again automatically.
  - CURRENT SOLUTION: I wrote a method (toggleNavBar) that collapses dropdown upon user clicking navlink, but there is no visual transition.
- Currency Converter Navlink does not show as active upon load.
- Historical chart does not always load on first page load. See Netlify app: https://aesthetic-crostata-36e2b3.netlify.app/


# REQUIREMENTS	Currency Converter - Create React App

## Requirements
Your project needs to satisfy the following basic requirements:

- 1 A list/table showing exchange rates for a base currency against a list of currencies:
  - User can change the base currency, and the list/table of rates will be updated. OK
    You can either use a drop down menu or a list of links to implement the base currency selection feature. It is up to you, but make sure it's intuitive.
- 2 A currency converter for a pair of currency, where the user can:
  - Edit the amount to be converted. Either allow user to swap the direction of the currency pair, or allow amounts on both sides to be edited. OK
    - Allow the user to change the currencies being calculated. OK
  Using a drop down menu or other means you think is intuitive.
- 3 Has a navigation bar:
  - Site name, can be super generic or super fun. OK
  - Anchor links if you are going to have multiple pages. OK
- 4 Has a footer:
  - Link to your portfolio site or social media accounts. OK
- It needs to be responsive, which means it can be easily used on a mobile browser as well!
- Version managed with Git, and has a GitHub repository. OK
- You need to deploy the production build either onto Netlify or Heroku (Heroku preferred). OK


### DESIGN AND LAYOUT
Bootstrap 5

Pages: 

Component hierarchy:
- App.js
  - Layout:
    - Nav bar
    - Footer
    - Routes:
      - Route 1 to Home page:
        - Currency Converter
      - Route 2 to Exchange Rates Table:
        - Exchange Rates Table


### QUESTIONS
- Money.js uses different exchange rates than Frankfurter App. Can I use both?
- Did I need to install popper.js to access popper.js/core? How can I remove it?
- Is there a better way to make nav hamburger menu work, without writing my own event handler?
  - Check out URL: https://stackoverflow.com/questions/54859515/react-bootstrap-navbar-collapse-not-working 
  - Using this.state instead? If displayed, this.state.dropdown: true
  - Is there a shorter way to write this event handler, using event propagation/bubbling? Check javascript.info.

- What do I need to import in App.js, and what in index.js? E.g. Bootstrap, Fontawesome - where do these imports belong?
- How are index.js and App.js connected?

- CurrencyConverter component:First line in render: console.log('*****render() in CurrencyConverter runs******');
   When I reload the page, this message is logged several times. Why does render() run so often?

- handleCurrencyChange in CC component only works when I run e.preventDefault(e). why?

- Does componentDidMount only get called when page is first loading? If so, I do not need to check if baseOfPair !== pairedCurrency, as they are set to EUR and USD initially.


### ANSWERED QUESTIONS:
- Q: How to setState for only one (sub)property of this.state, without copying all the parts of state that stay the same?
- A: URL: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged 
- Is the calculation of exchange rates correct when user changes currency in lower input field?


### API
URL: https://altexchangerateapi.herokuapp.com/
JSON object list on https://altexchangerateapi.herokuapp.com/currencies.


