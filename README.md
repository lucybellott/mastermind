# Mastermind
<!-- ![mastermind](https://iili.io/5Q7Je9.png) -->
![mastermind](https://i.postimg.cc/RqrJPjcv/Screen-Shot-2022-04-11-at-7-23-47-PM.png)
<br/>

Mastermind is a game where the computer generates a secret code of four numbers between 0 and 7. The player must guess the secret code based on hints provided. The computer will inform the player when:
<br/>
- They have guessed a correct number in the correct position.

- They have guessed a correct number in the wrong position. 

- If none of the numbers guessed are correct. 

It will not reveal which number was guessed correctly.
<br/>
A player will have 10 attempts to guess the combination.
<br/>

There's a score board to display the Top 10 scores


## Tech 

This project was built using Rails backend with a Postgres database and React frontend

## Structure

 Frontend Components:

- App <br/>
↓ <br/>
  - Game <br/>
↓ <br/>
    - Hidden Code <br/>  
    - ScoreBoard

<br/>

Backend Table:

Game
  - username 
  - trials 

  http://localhost:3000/games


## Setup

Running it locally:

In your terminal, navigate to the directory where you would like to clone this repository
<br/>

 - Run `git clone git@github.com:lucybellott/mastermind.git `
 <br/>

 - Running the Rails backend:
 <br/>
 - cd `mastermind-backend`
 <br/>
 - cd `master-game-backend`
 <br/>
 - Run `bundle install` 
 <br/>
 - Run `rails s`
 <br/>

 #### The backend will start on port 3000
 <br/>


 Running the React frontend:
 <br/>
 - cd   `mastergame`
 <br/>
 - Run `npm install`
 <br/>
 - Run `npm start`
 <br/>

#### The frontend will start on port 3001

## Ideas for future versions

- Create more hints
- Levels
- Users 





