# How to run the frontend / backend locally for developers

## Frontend
The first time you are running Vite + React frontend you will need to do the following
- enter the correct directory: `cd frontend`
- install dependencies: `npm install`
- To run the app on you local host run the following command: `npm run dev`
- **NOTE:** you *will* require NodeJS for this project, download [here](https://nodejs.org/en/download) 

## Backend
- As there are multiple tables we will have multiple models and controllers
- **User table Information**
    - the user table utilizes 3 attributes to define user roles
        - `isBasic`, `isChef`, and `isModerator`
    - these boolean values should be changed according to role
    - generally, avoid giving a single user multiple roles
- For the user controller:
    - `mod/...` mappings indicate mappings that only moderators utilize
    - `user/...` mappings indicate mappings that user & moderators can utilize