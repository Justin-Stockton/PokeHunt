# PokeHunt

- 'PokeHunt' is a place for users to create their Pokemon, discuss the Pokemon that have been created, and add upvotes and tags to Pokemon that have been created. The design was inspired by Product Hunt with a theme inspired by Pokémon. Let's see who's Pokemon is the very best!

# Technologies Used

- React
- Redux
- PostgreSQL
- Express.js
- Sequelize

### [Live link to PokeHunt](https://jstockton-pokehunt.herokuapp.com/)

### [Link to the PokeHunt Wiki](https://github.com/Justin-Stockton/PokeHunt/wiki)

### [The Database Schema](https://github.com/Justin-Stockton/PokeHunt/wiki/Database-Schema)

### [PokeHunt's Features](https://github.com/Justin-Stockton/PokeHunt/wiki/Features)

# Splash Page

# Pokemon

# Reviews

# Usage

## Development

Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository

- Create a new branch with git checkout -b feature-branch-name

- Make appropriate changes to the files and push back to github

- Create a Pull Request

  - Use a clear and descriptive title for the issue to identify the suggestion.

  - Include any relevant issue numbers in the PR body, not the title.

  - Provide a comprehensive description of all changes made.

Setting Up and Starting a Local Server

1. Download code and npm install in /backend to install all node dependencies for backend server.

2. Create a psql db user with createdb privileges.

   - Duplicate the .env.example for the dotenv package.

   - Update the following variables:

     - PORT the port that the server will listen to, 8080 by default
     - DB_USERNAME the user of the created psql db user
     - DB_PASSWORD the password for the psql db user
     - SESSION_SECRET a session secret key for encrypting session id's in the database
       - All other variables should remain the same

3. Setup PostgreSQL database

   - Run npx dotenv sequelize db:create
   - Run npx dotenv sequelize db:migrate
   - Run npx dotenv sequelize db:seed:all

4. Start express server by running npm start in the /backend directory
5. The backend server will start on http://localhost:5000
6. Run `npm install` in `/frontend` to install dependencies for frontend server.
7. Run `npm start` in the `/frontend` directory
8. The frontend server will be live on http://localhost:3000 by default

## Bugs

I love squishing bugs! If you find one, let me know by opening an issue [here](https://github.com/Justin-Stockton/PokeHunt/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug, or where you were/ what you were doing at the time you spotted the bug). Screenshots or recordings greatly help to narrow down what the problem could be!

## Created By

[Justin Stockton](https://github.com/Justin-Stockton)
