# Project-3

Deployed project can be found at: https://sabotage-game.herokuapp.com/.

#### -- Project Status: Active

## Project Intro/Objective
The purpose of this project was to create a fun and engaging game for users, which leaves them feeling like they may have wasted some time and for our team to dive into React. We all had less than two weeks of experience with React before creating Sabotage. We also wanted to create a game that felt semi-balanced, but also left a lot of chance and drew inspiration from the Game of Life.

### Technologies
* HTML
* CSS
* Node.js
* MongoDB
* Express.js
* React
* Passport.js
* Moment.js
* Material UI
* Pusher

## Project Description
Sabotage is a game where the user creates an account, and immediately starts losing 10 points every 10 seconds they are on the site while logged in, whether they are playing the game or not. The user has to play the game which is essentially trying to spell out a word given the user, but their keyboard is shuffled so each letter pressed on the keyboard has been reassigned to a different letter. After getting three consecutive questions correct, or 2 consecutive quetions wrong the user can spin a roulette wheel to win or lose any number of points between 1 and 15000. The team wanted to include a live leaderboard that showed the progress of users as they rose and fell down the leaderboard in real-time, and accomplished this in a local setting. In order to do so we used Pusher, which uses replica sets and oplogs to track the changes between the primary and secondary sets and emit events based on certain types of changes, more info can be found here: https://pusher.com/docs/channels. When we deployed the project to Heroku, we wanted to deploy it for free so we could keep the game as a fun continuing project and not as a financial burden, which couldn't be done without removing the need for replica sets and Pusher, and thus the live leaderboard feature. Instructions on using the local version can be found in the **Getting Started** sections however.

## Getting Started

1. Clone this repo (for help see this [tutorial](https://help.github.com/articles/cloning-a-repository/)).
2. Using your console/terminal traverse into the local repo you just cloned.
3. Run the command *npm i* and wait for npm to finish downloading the node modules. Note there should now be a folder titled *node_modules* in the local repo. If you need to install npm, you can download node.js and npm from here: https://nodejs.org/en/.
4. Create a new tab in your existing console/termical or create a new console/terminal window and run the command *mongod --replSet rs* if you have mongoDB installed on your machine, otherwise it can be downloaded from here: https://www.mongodb.com/download-center/community.
5. Create a new tab in your existing console/termical or create a new console/terminal window and run the command *mongo*, then run the command *rs.init()*. 
6. Run the command *npm start* in your console/terminal and a window in your default web browser should open with the address *localhost:3000/*.
7. If you have any issues following any of these instructions, reach out to us, our info is in the **contact** section.


## Contributing Members
* **Scott Hodges shodges@gmail.com**
* **Zubin Mulji znmulji1@gmail.com**
* **Lance Toledo**
* **Isabelle Farrell**
* **Quinton Smith**

