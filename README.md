## Author: Abhijit Baldawa

A Single page web application to track favourite breweries across the globe using open source https://www.openbrewerydb.org API

### Video Demo

The full video demo of my application can be found on [here](https://www.dropbox.com/scl/fi/v6xo2oamnobfqf3c4id0b/Screen-Recording-2023-12-21-at-9.49.26-PM.mov?rlkey=gtjvbj48fq9xbhegp013817hq&dl=0)

### Tech Stack used

1. React.js
2. Typescript
3. MUI - Component library
4. react-map-gl - React wrapper to show maps
5. mapbox-gl - Map library to show brewery location
6. Zustand - State manager
7. ZOD - Runtime data validation
8. react-router-dom - Frontend routing
9. axios - Data fetching

### Functionality

1. Error handling is done throughout the app. If any error occurs during data fetching then error popup is shown detailing the error.
2. Loading state are shown on UI
3. Brewery address is shown on actual map (using mapbox-gl) which the user can interact with.
4. Designed my own custom datagrid from scratch to show beer list with filtering/sorting/pagination. The data grid is data agnostic and can easily work with any JSON data.
5. The beer searchbox filter on home page scrolls infinitely and fetch data as soon as user scrolls towards the end of the search result. The searched brewery can be added to favorite.

### How to run

1. `git clone https://github.com/abaldawa/favorite-breweries-tracker.git`
2. `cd favorite-breweries-tracker`
3. `cp .env.example .env`
4. `npm i`
5. `npm run start`
6. Go to browser on `localhost:3000` to see the UI
