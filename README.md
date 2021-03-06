# Eventify

Live: https://eventify2021.herokuapp.com/

Eventify is a website where users can host and review car events. In order to leave a review or host an event you must have an account.

For testing purposes:<br>Username: TestUser<br>Pwd: test11

This is a CRUD project, made using Node.js, Express, MongoDB and Bootstrap.

## Features
* User authentication & authorization alongside sessions.
* Users can create, edit, update and remove events.
* Users can create reviews and remove them if needed.
* Each user can see the location of all events on the map. 
* Each hosted event will be marked on both maps.

## Run it locally
Install [mongodb](https://www.mongodb.com/)
```
git clone https://github.com/Nikolaevmar/Eventify
cd Eventify
npm install
```

Create a .env file in the root of the project and add the following:  

```
DB_URL='<url>'
MAPBOX_TOKEN='<key>'
```

Run ```mongod``` in another terminal and ```node index.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

<img width="684" alt="Screenshot_1" src="https://user-images.githubusercontent.com/77740117/137200825-80357e45-903d-4c55-a1e8-4abc801b1213.png">
<img width="673" alt="Screenshot_2" src="https://user-images.githubusercontent.com/77740117/137200866-0306bab3-bdb3-493f-bb87-3b6b48774a3f.png">
<img width="676" alt="Screenshot_3" src="https://user-images.githubusercontent.com/77740117/137200871-b7f1879d-a32c-44ec-b6fa-1595c59f5e17.png">
