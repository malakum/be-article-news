# Northcoders News API

For instructions, please head over to [L2C NC News]

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering 

CREATE two environment file as .env.development and .env.test.
# Northcoders News API

## About
In this project I have created a API for a news review website (similar to reddit). This api has multiple endpoints. Please use the /api endpoint to see a list of available endpoints, along with requirements for request bodies and available queries.

## Link 
Hosted version can be found here
https://be-article-news.onrender.com/api

## Set-up

### System requirements

You will need to install Node v20.0.0 and PSQL v14.12 to run this repository.


### Cloning the respository
If you want to work with this repository locally you will need to clone it onto your local machine. To do this, navigate to where in your file system you want the repository to be saved in the command line, and run the following command:
```
git clone https://github.com/malakum/be-nc-news.git 
```

### Installing dependencies
This repository makes use of a few other packages that you will need to install before it is able to run locally. You can install dependencies by running command
```
npm install
```
OR 

you can run below commands to install dependencies
```
npm init -y
npm i dotenv
npm i express
npm i pg
npm i pg-format
```
In order to run the tests, you will need to install a few additional packages, that the tests are dependent on: jest, jest-sorted and supertest.
```
npm i jest
npm i jest-sorted
npm i supertest
```

### Setting up environments
You will need to create two .env files in root:  .env.test and .env.development 

.env.development file should contain the line PGDATABASE=nc_news 

.env.test file should contain the line PGDATABASE=nc_news_test

The database specified in .env.test will be accessed when running tests, and the database specified in .env.development will be used when running tests in development enviornment. Make sure that these .env files are included in .gitignore.

### Seeding local database
In order to create local databases that the app can access, and seed them with data as contained in the /db/data/test-data and /db/data/development-data folders, you will first need to set up the databases. To do this open up PSQL in your terminal by using the psql command, and then execute the following commands.
```
    DROP DATABASE IF EXISTS nc_news_test;
    DROP DATABASE IF EXISTS nc_news;
```
```
    CREATE DATABASE nc_news_test;
    CREATE DATABASE nc_news;
```
## Running tests

To run the tests, run the below command -
```
 npm  run test - will run all tests in all test files
```
 or 
```
 npm  run test app  
 ```
 will run only app tests
 ```
 npm run test utils
 ```
 will run utils tests


