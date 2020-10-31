# Mongodb-project for FutureComputer


This project have backend and frontend both.

### Step 1 – Clone this project to www or htdocs folder


git clone https://github.com/Vandy1104/futurecomputer.git


### Step 2 – Install packages

npm i (for both backend and frontend)


### Step 3 – Mongodb

*You should have a mongodb account. The URI connection string needs username, password and cluster name with attached id. If not, create an account and get the uri string from https://www.mongodb.com/*

Copy the config-copy.json file (for both frontend and backend folder) and rename it to config.json. add your username, password and clustername with its id for backend config.json and SERVER_URL and SERVER_PORT for frontend config.json.

### Step 4 - Run the project

*You should have installed nodemon globally. if not run **npm install nodemon -g***

###### use the legacy version in vagrant set up
nodemon -L index.js


###### use this in non-vagrant set up
nodemon index.js


### Step 5 - To see the home page

http://localhost:8888/futurecomputer/frontend/index.html

or use ip in the place of localhost (Port can vary as per the OS)

You can also check endpoints using Postman.


### Step 6 - Endpoints

**Endpoints**       | **Description**             |**Acceptable values**| **Method**|
--------------------|-----------------------------|---------------------|-----------|
|/allProductsFromDB | view all products/courses
                                      from db     |                     | GET       |
|/addProduct        | add a product/course in db  |                     | POST      |



### Step 7 - Mongodb

To see data being saved,  click on cluster->collections->futurecom->products respectively
or
click on View all Courses button on home page (Below add course form.)



Good Luck!
