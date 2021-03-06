# Percarious Ceiling Fan OCLC Search System

![icon](media/Percarious-Ceiling-Fan.svg)

## Connect to the website [HERE](http://10.173.131.12:3000/) if you are on the UofSC school network!

# OCLC Early Middle European Catalog Search

This project entails a graphical user interface to query the OCLC MARC21 data-set, allowing not only to get only the specific desired information out of a large and complex record, but also allowing for advanced search tools such as AND/OR operators, allowing for additional words to separate the words of a search string, and fuzzy matching, as well as being able to produce graphs of different aspects of the results such as graphing the number of results by the decade they were published, graphing the language distribution of results, etc. Time permitting, we may even be able to look into methods of search optimization and other higher-level problems that the unique data set provides, but these are more secondary to the main goal of creating a user friendly tool to get the desired information out of a dirty, expansive, and complicated data set.
For a user trying to study this data set, access to an easy to use searching tool is imperative. It is far too expansive for any person to look over manually, and each record has an extensive amount of information about each publication, most of which is not pertinent to what a person will be looking for at any given time. By creating a tool to make accessing and using this information easier, our users will be able to perform research on this data far easier than they were able to in years past.

# S

## External Requirements

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
* [mySQL](https://www.mysql.com/)

## Setup
Once the repo is cloned, and Node.js is installed, run `npm i` inside both the client and server folders. This will install the npm dependencies.

## Running

While in the server folder run the npm start command. In another terminal cd into the client folder and also run the npm start command.

# Deployment

Because our webapp will be utilizing Nodemon, the react app will automatically refresh its codebase once a change is detected in the source code. This makes deployment very easy, it is as simple as updating the code on the VM running the webapp. The live instance will be automatically refreshed and the updated version deployed.

# Testing

all tests are in `server/tests/`.
  
## Testing Technology

For unit testing we use Mocha and Unit.js (npm install).
 * In terminal run "npm install -g mocha"

For behavioral testing we use Selenium.
  * Install Selenium [Selenium Download](https://www.selenium.dev/downloads/)

## Running Tests

To run unit tests, run the express server locally ("npm start" in `server/`) navigate into `server/tests/` and run "npm test" in terminal.

To run behavioral tests bring up the website locally [HERE](http://10.173.131.12:3000/) and run 'python behave.py' in terminal.
(Website must be ran on school VPN and running to perform test)

# Authors

* Evan Bryer email: ebryer@email.sc.edu
* Casey Blue email: ceblue@email.sc.edu
* Tyron Schultz email: tschultz@email.sc.edu
* Rebekah Soard email: rsoard@email.sc.edu

