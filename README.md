# MyNews APP made in REACT

![MyNews app by Čedomir Babić](./mynewsbycb21.jpg?raw=true 'MyNews')

## Resources

The app is using and api provided from https://newsapi.org/
Both the featured news and latest news use the "general" category as it provides 1000 news on each fetch which I found perfect for an infinite news loading on latest news.

## Functionality

The news are received from the api and loaded to the latest and featured news. Categories can be changed by pressing the according button.
Articles can be searched from the search input. Latest articles can be scrolled down to trigger a "load more" function which does infinite loading. Articles can be added to favorites by pressing the heart button in article's top right corner and viewed when "Favorites" button is pressed.

## Method

The app fetches news with an async-await fetch function, on init and on category change. This was done using useEffect hook with only one dependency (url). The state was managed using useReducer hook.
I wanted to use as fewer as possible state passing and state lifting using props, which is why useContext hook is used.
Style was added using CSS modules.
Search is implemented using onSubmit event and input onchange with a little help of useState hook.

## Issues

The app works flawlessly when launched in localhost (development mode) but throws CORS errors if hosted on a server. This is due to the free API plan.

![CORS error](./cors-error.jpg?raw=true 'MyNews CORS error')

## Running

The app isn't using any global packages. Fork it, use commands npm install and npm start.

## Author

Made by Čedomir Babić, august 2021.
cbabic.st@gmail.com
