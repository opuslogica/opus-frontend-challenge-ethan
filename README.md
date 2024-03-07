# Welcome to the Opus Logica Frontend Challenge!

### Objective
Build a web application in React to that lets a user search for a country, and then interact with the results in the form of a table.

We've taken care of setting up the basic UI for the site using [shadcn/ui](https://ui.shadcn.com/), and you'll take it from there to hook up to the api and build out the following functionality. Please use tailwind for any styling.

You'll be starting with a static template, feel free to structure your final app in anyway that you'd like.

### Requirements
- use the following API for the search:
  - https://restcountries.com/v3.1/name/{query}
  - where {query} is replaced with the ingredient name (partial or full)
- user can input the name of a country (partial or full) for searching
- user can view results of the search in the form of a table
- the table should show a loading status while query searches are running
- please display the data for the columns that we have set up in the template
- please set up the following interactions:
  - the filter drop down should populate with a unique list of languages present current result set
    - selecting a language in the dropdown should filter the visible rows to only those which speak that language
  - clicking the country's name should open a google maps link to it in a new tab
  - table should show a maximum of 20 records at a time
  - table should paginate if more than 20 records are returned

### Setup
You can get this app up and running locally with `yarn install && yarn start`

### Submit
Please submit your completed response via a pull request to this repo, and tag the developer who invited you to the repo as a reviewer

Good luck!
