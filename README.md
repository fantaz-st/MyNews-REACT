#MyNews APP made in REACT

![MyNews app by Čedomir Babić](./mynewsbycb21.jpg?raw=true 'MyNews')
![MyNews app by Čedomir Babić](mynewsbycb21.jpg?raw=true 'MyNews')

##Resources
The app is using and api provided from https://newsapi.org/
Both the featured news and latest news use the "general" category as it provides 1000 news on each fetch which I found perfect for an infinite news loading on latest news.

##Method
The app fetches news with an async-await fetch function, on init and on category change. This was done using useEffect hook with only one dependency (url). The state was managed using useReducer hook.
I wanted to use as fewer as possible state passing and state lifting using props, which is why useContext hook is used.
Style was added using CSS modules.

##Running
The app isn't using any global packages. Fork it, use commands npm install and npm start.

##Author
Made by Čedomir Babić, august 2021.
cbabic.st@gmail.com
