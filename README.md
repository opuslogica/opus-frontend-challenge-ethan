Welcome to the Opus Frontend Challenge! The goal of this excercise is to get a sense of how you build out web app features from a description

objective:
  build a web application to that lets a user search for a country, and then allow the user to interact with the results in the form of a table.

  we have set up a basic table UI using (shadcn/ui)[https://ui.shadcn.com/], and you will take it from there to hook up to the api and build out the functionality

requirements
  - user can input the name of a country (partial or full) for searching
  - user can view results of the search query in the form of a table
  - use the following API for the search:
    - https://restcountries.com/v3.1/name/{query}
    - where {query} is replaced with the ingredient name (partial or full)
  - the table should show a loading status while query searches are running
  - please display the data for the columns that we have already set up
  - please set up the following interactions:
    - sort rows by a given column
  - table should show a maximum of 20 records at a time
  - table should paginate if more than 20 records are returned
