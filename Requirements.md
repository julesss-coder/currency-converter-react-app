# REQUIREMENTS	Currency Converter - Create React App

## Requirements
Your project needs to satisfy the following basic requirements:

- 1 A list/table showing exchange rates for a base currency against a list of currencies:
  - User can change the base currency, and the list/table of rates will be updated.
    You can either use a drop down menu or a list of links to implement the base currency selection feature. It is up to you, but make sure it's intuitive.
- 2 A currency converter for a pair of currency, where the user can:
  - Edit the amount to be converted. Either allow user to swap the direction of the currency pair, or allow amounts on both sides to be edited.
  - Allow the user to change the currencies being calculated. Using a drop down menu or other means you think is intuitive.
- 3 Has a navigation bar:
  - Site name, can be super generic or super fun.
  - Anchor links if you are going to have multiple pages.
- 4 Has a footer:
  - Link to your portfolio site or social media accounts.
- It needs to be responsive, which means it can be easily used on a mobile browser as well!
- Version managed with Git, and has a GitHub repository.
- You need to deploy the production build either onto Netlify or Heroku (Heroku preferred).

- [ ] Navlink (from breakpoint lg onward) should show '.active' when clicked. Currently, the Currency Converter page is set to active by default, and clicking on the Exchange Rates Table does not change that.

### BUGS: 
- [ ] Dropdown menu from xs to md does not collapse when a menu link is clicked.

Apart from meeting those requirements, your project will be scored on code cleanliness, code clarity, project structuring, design, and user experience. So do your best to make the app intuitive, bug free, and good looking.

### Design and Layout 
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

#### Mobile, breakpoint xs (<576px)

#### Larger breakpoints


---

### QUESTIONS
- Do I need nested routes on the CurrencyConverter and Exchange Rate Tables page?
- Did I need to install popper.js to access popper.js/core? How can I remove it?
- Do I need to import Bootstrap JS?
- Is there a better way to make nav hamburger menu work, without writing my own event handler?
  - Check out URL: https://stackoverflow.com/questions/54859515/react-bootstrap-navbar-collapse-not-working 
  - Using this.state instead? If displayed, this.state.dropdown: true
  - Is there a shorter way to write this event handler, using event propagation/bubbling? Check javascript.info.

- What do I need to import in App.js, and what in index.js? E.g. Bootstrap, Fontawesome - where do these imports belong?
- How are index.js and App.js connected?

- When I fetch all currencies in App.js and pass them as props to CurrencyConverter, `allCurrencies` is a pending Promise and not the actual list of currencies. Assumption: Render of component is faster than API request???
--> Try fetching all currencies inside CurrencyConverter


### PROCESS
See "Thinking in React"
- Build a static version first


### LOGIC

#### NECESSARY INFORMATION

Information we need to get from API:
  - Dropdown menus: All available currencies****TODO NOW***
  - Exchange Rates Table: 
    Base currency: EUR, 
    Amount: 1,
    Rates for all currencies
  - Currency Converter: Current currency pair and amounts:
    base: EUR,
    amount: 1, 
    exchangeTo: USD,
    rate: 0.9887
    // This is just a part of the information needed for Exchange Rates Table
    //****************************************************
    // Put base, amount, rates in state inside App.js
    // With default base EUR
    // On user interaction: change state to new base and amount. Fetch rates. 
    //****************************************************


#### LOGIC OF PAGE CURRENCY CONVERTER

// Initial state of page after loading:
Default currency pair: EUR - USD
Default value of first amount input field: 1
Value of second input field: Exchange rate of EUR to USD for 1 EUR


// Change currency - must work with both currency/amount input fields
If user clicks drowdown arrow on currency menu:
  Show all available currencies
  If user picks currency:
    Display currency (flag, abbreviation, full name) in input field
    // Default value of amount input field is 1
    Calculate exchange rate based on current amount under input field
    Display exchange rate in opposite input field

    If user changes currency amount:
      Calculate exchange rate based on current amount under input field
      Display exchange rate in opposite input field

If user clicks switch:
  // Switch currency pair
  Render base currency in second input field
  Render exchange currency in first input field


  #### LOGIC OF EXCHANGE RATES TABLE

  Default currency and amount:
  EUR, 1

  Necessary information:
    base: USD,
    amount: 1
    rates: currency: amount...

  If user changes currency amount:
    Calculate exchange rates based on current base currency under input field
    Display exchange rates in tables below

  If user clicks dropdown arrow on currency menu:
    Show all available currencies
    If user picks currency:
      Display currency (flag, abbreviation, full name) in input field
      // Default value of amount input field is 1
      Calculate exchange rates based on current amount
      Display exchange rates in tables below



### API
URL: https://altexchangerateapi.herokuapp.com/
JSON object list on https://altexchangerateapi.herokuapp.com/currencies.