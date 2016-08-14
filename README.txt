UMD web calander 0.0.01

Requirements

Node.js 
MongoDB
Git
Bower -> npm install -g Bower
Grunt -> npm install -g grunt-cli

Setting up local MongoDB
1. In C drive make a file called "data" and within it make a file called "db"
2. In terminal, go to where mongoDB is installed and go to MongoDB/server/3.2/bin/mongod and run the command 'mongod'
3. In seperate terminal go to the same place and start the mongo shell using 'mongo'
4. create a user for umdwebapp so the app and db can connect use this 'db.createUser({user: "umdwebapp", pwd: "umdwebapp", roles: [{role: "readWrite", db: "umdwebapp"}]})'

Building the app on your local computer
1. clone the repo
2. navigate to the location of the folder
3. run 'npm install'
4. run 'bower install'
5. run 'grunt' this will compile the code into a minified version and run the server
6. go to localhost:8080 in web browser (chrome pls)
7. any changes to the front end/ anything in public will change on refresh of the webpage
8. any changes to the back end you will need to cancel grunt and re-run it to restart the server

