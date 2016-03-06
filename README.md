# Modeling Relationships with Mongoose & MongoDB
--------
## What it does?
- Create the app then create a model with an embeded schema for musical Albums. Each Album will contain an array of songs.

## Steps:
- Create the app, and set `server.js` as the entry point:

  ```
  cd workspace  
  mkdir mongoose-relationships-practice
  cd mongoose-relationships-practice
  npm init
  touch server.js
  ```

- Install necessary packages:

  ```
  npm install --save express mongoose body-parser morgan
  ```

- Download the server.js file which includes the routes for albums, songs, and artists.

- Download the models files which indlude Album.js and Artist.js

- Open terminal and start 
	```
	mongod
	```
	
- On another terminal, start
	```
	mongo
	```
- Then, start your node server
	```
	node server.js
	```
	or
	```
	nodemon server.js
	```
	(this will auto restart the server everytime you change your code.)
- Test out your code in Postman for the crud operations

- Insert data into your Album and Artist database

- Use ``` mongo ``` to ```show dbs``` 

- Then ```use mongoose-relations-practice```

- And ```show collections``` 

- Then use the mongodb commands to see your albums and artists like this:
 
	```
	db.albums.find().pretty()
	```

	```
	db.artists.find().pretty()
	``` 

### Good luck & Happy coding!

