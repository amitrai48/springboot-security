# springboot-security
A simple todo app using spring boot, spring security, mysql and angularjs.

#Features
1 - Login and User registration functionality
2 - Create, Edit, Delete Todos after successful login
3 - Custom Authentication Provider filter for spring security
4 - Spring security + angular js 

# Install front end assets
Install bower if you dont have it already

npm install bower -g

Then run 'bower install' from the root of the folder

# Running the Application

Run the following from the command line from the root directory

mvn spring-boot:run

ctrl + c to gracefully close the application.

#MySQL

The app uses mysql as backend database to store information. Make sure you have a MySQL server running on localhost or point appropriate SQL server url in src\main\resources\application.properties

change url,username,password accordingly.

#Queries

For any queries please raise an issue or mail me amitrai48@gmail.com